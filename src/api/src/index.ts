import { makeExecutableSchema } from 'apollo-server'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { mocks } from './clients'
import { DeprecatedDirective } from './directives'
// import { default as resolvers } from './resolvers'
import { default as typeDefs } from './schemaV2'
import { contextFn } from './schemaV2/context'

const options = { port: 2300 }

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: {},
	// ignore missing resolvers
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


app.get('/something', (req, res) => {
	res.send(`hello world`)
})

const server = new ApolloServer({
	schema: applyMiddleware(schema),
	typeDefs,
	// prefers resolvers but uses mock if not implemented
	mockEntireSchema: false,
	mocks,
	resolvers: {},
	schemaDirectives: {
		deprecated: DeprecatedDirective,
	},
	tracing: true,
	context: contextFn,
	// plugins: [TracingPlugin],
})


app.use((req, res, next) => {
	console.log()
	if (`${req.headers['x-client-version']}`.match(/2/)) {
		console.log('VERSION 2')
	} else {
		server.getMiddleware({ path: '/' })(req, res, next)
		console.log('VERSION 1')
	}
})


app.listen(options, () => console.log(`🚀 Server ready at http://localhost:${options.port}`))
