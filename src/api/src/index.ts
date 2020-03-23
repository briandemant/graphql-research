import { makeExecutableSchema } from 'apollo-server'
import { ApolloServer, gql } from 'apollo-server-express'
import * as express from 'express'
import { readFileSync } from 'fs'
import { GraphQLResolveInfo } from 'graphql'
import { applyMiddleware } from 'graphql-middleware'
import { mocks } from './clients'
import { DeprecatedDirective } from './directives'
// import { default as resolvers } from './resolvers'
import { default as typeDefs } from './schema'
import { Context, contextFn } from './schema/context'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const options = { port: 2300 }

const schema = makeExecutableSchema({
	typeDefs,
	resolvers: {
		Query: {
			apiVersion: () => pkg.version,
		},
	},
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
	if (`${req.headers['x-client-version']}`.match(/beta/)) {
		console.log('BETA VERSION')
		const serverA = new ApolloServer({
			typeDefs: gql`
          type Query {
              apiVersion: String
          }
			`,
			mocks: {
				Query: (parent: any, params: any, ctx: Context, info: GraphQLResolveInfo) => ({
					apiVersion: (parent: any, params: any, ctx: Context, info: GraphQLResolveInfo) => '2.0.0-beta',
				}),
			},
		})
		serverA.getMiddleware({ path: '/' })(req, res, next)
	} else {
		console.log('VERSION', pkg.version)
		server.getMiddleware({ path: '/' })(req, res, next)
	}
})


app.listen(options, () => console.log(`🚀 Server ready at http://localhost:${options.port}`))
