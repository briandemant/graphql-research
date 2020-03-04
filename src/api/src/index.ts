import { ApolloServer, gql } from 'apollo-server'
import { DeprecatedDirective } from './directives'
import { default as typeDefs } from './schema'
import { default as resolvers } from './resolvers'

// const typeDefs = `
// 	directive @key(fields: String|[String]) on OBJECT | FIELD_DEFINITION
//
// 	extend type Query {
// 		me: User
// 	}
//
// 	type User @key(fields: "id") {
// 		id: ID!
// 		name: String!
// 	}
// `
//
// const resolvers = {
// 	Query: {
// 		me() {
// 			console.log('Aaaaa')
//
// 			return { __typename: "User",id: 1 }
// 		},
// 	},
// 	User: {
// 		__resolveReference({ id }: { id: string }) {
// 			console.log('Bbbb')
// 			return {
// 				id: 1,
// 				name: 'brian',
// 			}
// 		},
// 	},
// }

const { buildFederatedSchema } = require('@apollo/federation')

const options = { port: 2300 }

const server = new ApolloServer({
	typeDefs,
	resolvers,
	schemaDirectives: {
		deprecated: DeprecatedDirective,
	},
	tracing: true,
})

server.listen(options).then(({ url }: any) => {
	console.log(`🚀 Server ready at ${url}`)
})
