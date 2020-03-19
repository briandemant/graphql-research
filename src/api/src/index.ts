import { makeExecutableSchema } from 'apollo-server'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { DeprecatedDirective } from './directives'
import { debugMiddleware, telemetryMiddleware, TracingPlugin } from './plugins/'
import { default as resolvers } from './resolvers'
import { default as typeDefs } from './schema'
import { contextFn } from './schema/context'

const options = { port: 2300 }
let prometheusPort = 2302

const schema = makeExecutableSchema({
	typeDefs,
	// @ts-ignore
	resolvers,
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
	schema: applyMiddleware(schema, debugMiddleware, telemetryMiddleware),
	typeDefs,
	resolvers,
	schemaDirectives: {
		deprecated: DeprecatedDirective,
	},
	tracing: true,
	context: contextFn,
	plugins: [TracingPlugin],
})

server.applyMiddleware({ app, path: '/' })

// server.listen(options).then(({ url }: any) => {
// 	console.log(`🚀 Server ready at ${url}`)
// })

app.listen(options, () => console.log(`🚀 Server ready at http://localhost:${options.port}`))
