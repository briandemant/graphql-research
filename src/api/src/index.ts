import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { GraphQLResolveInfo } from 'graphql'
import { applyMiddleware } from 'graphql-middleware'
import { DeprecatedDirective } from './directives'
import { ExamplePlugin, tracingMiddleware, TracingPlugin } from './plugins/'
import { default as resolvers } from './resolvers'
import { default as typeDefs } from './schema'
import { Context, contextFn } from './schema/context'

const options = { port: 2300 }

let counter = 0

const logInput = async (resolve: any, parent: any, args: any, context: Context, info: GraphQLResolveInfo) => {
	const id = `${context.trace.spanId ? context.trace.spanId : context.trace.requestId}/${++counter}`
	const subTrace = {
		requestId: context.trace.requestId,
		spanId: id,
		path: [...context.trace.path, id],
	}

	console.log(`${id} -`)
	console.log(`${id} name`, info.fieldName)
	// console.log(`${id} path`, info.path)
	console.log(`${id} tpath`, subTrace.path.join('/'))
	// console.log(`${id} parent`, parent)
	// console.log(`${id} args`, args)
	console.log(`${id} trace`, context.trace)
	console.log(`${id} info`, info)
	const result = await resolve(parent, args, { ...context, trace: subTrace }, info)
	console.log(`${id} --`)
	return result
}

const logResult = async (resolve: any, parent: any, args: any, context: Context, info: GraphQLResolveInfo) => {
	console.log(`${context.trace.spanId} Result:`)
	const result = await resolve(parent, args, context, info)
	console.log(`${context.trace.spanId}       ${JSON.stringify(result)}`)
	if (!info.path.prev) {
		console.log(info.parentType, info.path)
	}
	return result
}

const schema = makeExecutableSchema({
	typeDefs,
	// @ts-ignore
	resolvers,
})

const server = new ApolloServer({
	schema: applyMiddleware(schema, tracingMiddleware, logInput, logResult),
	typeDefs,
	resolvers,
	schemaDirectives: {
		deprecated: DeprecatedDirective,
	},
	tracing: true,
	context: contextFn,
	plugins: [TracingPlugin],
})
server.listen(options).then(({ url }: any) => {
	console.log(`🚀 Server ready at ${url}`)
})
