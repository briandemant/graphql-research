import { makeExecutableSchema } from 'apollo-server'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { GraphQLResolveInfo } from 'graphql'
import { applyMiddleware } from 'graphql-middleware'
import { mocks } from './clients'
import { DeprecatedDirective, AuthDirective } from './directives'
// import { default as resolvers } from './resolvers'
import { default as typeDefs } from './schemaV2'
import { Context, contextFn } from './schemaV2/context'

const options = { port: 2300 }

let counter = 0

const logInput = async (resolve: any, parent: any, args: any, context: Context, info: GraphQLResolveInfo) => {
	const id = `${context.trace.spanId ? context.trace.spanId : context.trace.requestId}/${++counter}`
	const subTrace = {
		requestId: context.trace.requestId,
		spanId: id,
		path: [...context.trace.path, id],
	}

	// console.log(`${id} -`)
	const alias = info.path.key != info.fieldName ? ` as ${info.path.key}` : ''
	if (!info.path.prev) {
		console.log(`\n\n${id} start: ${info.parentType}.${info.fieldName}${alias}`)
	} else {
		console.log(`${id} resolver: ${info.parentType}.${info.fieldName}${alias}`)
	}
	// console.log(`${id} path`, info.path)
	// console.log(`${id} tpath`, subTrace.path.join('/'))
	// console.log(`${id} parent`, parent)
	// console.log(`${id} args`, args)
	// console.log(`${id} trace`, context.trace)
	// console.log(`${id} info`, info)
	const result = await resolve(parent, args, { ...context, trace: subTrace }, info)
	// console.log(`${id} --`)
	return result
}

const logResult = async (resolve: any, parent: any, args: any, context: Context, info: GraphQLResolveInfo) => {
	const result = await resolve(parent, args, context, info)
	console.log(`${context.trace.spanId} Result:`, result)

	return result
}

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: {},
	// ignore missing
	allowUndefinedInResolve: true,
	resolverValidationOptions: {
		requireResolversForArgs: false,
		requireResolversForNonScalar: false,
		requireResolversForAllFields: false,
		requireResolversForResolveType: false,
		allowResolversNotInSchema: false,
	},
})

const app = express()
app.use((req, res, next) => {
	// console.log(colors.cyan("url"),req.url)
	next()
})

let count = 0
app.get('/metrics', (req, res) => {
	res.send(`metrics_scrape_count ${++count}`)
})

const server = new ApolloServer({
	schema: applyMiddleware(schema, logInput, logResult),
	typeDefs,
	mocks,
	resolvers: {},
	schemaDirectives: {
		deprecated: DeprecatedDirective,
		auth: AuthDirective,
	},
	tracing: true,
	context: contextFn,
	// plugins: [TracingPlugin],
})

server.applyMiddleware({ app, path: '/' })

// server.listen(options).then(({ url }: any) => {
// 	console.log(`🚀 Server ready at ${url}`)
// })

app.listen(options, () => console.log(`🚀 Server ready at http://localhost:${options.port}`))
