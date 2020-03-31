import { makeExecutableSchema } from 'apollo-server'
import { ApolloServer, gql } from 'apollo-server-express'
import * as express from 'express'
import { readFileSync } from 'fs'
import { GraphQLError, GraphQLResolveInfo } from 'graphql'
import { applyMiddleware } from 'graphql-middleware'
import { DeprecatedDirective } from './directives'
import { scalarMiddleware } from './plugins'
import { mocks, resolvers } from './resolver'
import { typeDefs } from './schema'
import { Context, contextFn } from './schema/context'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

const options = { port: 2300 }

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
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
	schema: applyMiddleware(schema, scalarMiddleware),
	typeDefs,
	// prefers resolvers but uses mock if not implemented
	mockEntireSchema: false,
	mocks,
	schemaDirectives: {
		deprecated: DeprecatedDirective,
	},
	tracing: true,
	context: contextFn,
	// plugins: [TracingPlugin],
	formatError: err => {
		// Don't give the specific errors to the client.
		if (err.message.match(/Invalid/)) {
			return err
		}

		return new GraphQLError(err.message, err.nodes, null, err.positions, err.path)
	},
})

app.use((req, res, next) => {
	if (`${req.headers['x-client-version']}`.match(/beta/)) {
		console.log('BETA VERSION')
		const fake = new ApolloServer({
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
		fake.getMiddleware({ path: '/' })(req, res, next)
	} else {
		console.log('\n\nVERSION', pkg.version)
		server.getMiddleware({ path: '/' })(req, res, next)
	}
})

app.listen(options, () => console.log(`🚀 Server ready at http://localhost:${options.port}`))
