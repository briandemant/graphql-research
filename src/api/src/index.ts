// import { GQLUser } from './_gen/server-types'
// import { TrimmedNotEmptyString } from '@demo/lib'

// const user: GQLUser = {
// 	id: '1',
// 	name: new TrimmedNotEmptyString('John'),
// 	// createdAt: new Date(),
// 	// listings: [],
// }

// // user.listings.push({
// // 	id: '1-1',
// // 	title: 'buy me',
// // 	owner: user,
// // })

// console.log(user.name)

import { GraphQLServer } from 'graphql-yoga'
import { default as typeDefs } from './schema'
import { default as resolvers } from './resolvers'

const options = { port: 2300 }

const server = new GraphQLServer({
	typeDefs,
	resolvers,
})

server
	.start(options, () => console.log(`Server is running ⚡ on localhost:${options.port}`))
	.catch(err => console.error('connection Error', err))
