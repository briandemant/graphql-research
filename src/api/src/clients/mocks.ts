import { UuidV4 } from '@demo/lib'
import { IMocks } from 'apollo-server'
import * as faker from 'faker'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../schemaV2/context'

const { MockList } = require('apollo-server')

faker.seed(13)

const fakeUser = () => {
	let firstName = faker.name.firstName()
	let lastName = faker.name.lastName()
	return {
		firstName,
		lastName,
		id: UuidV4.generate().toString(),
		name: faker.name.findName(firstName, lastName),
		email: faker.internet.email(firstName, lastName),
		userName: faker.internet.userName(firstName, lastName),
		listingConnection: (
			parent: any,
			params: { sortBy: string; reverse: boolean },
			ctx: Context,
			info: GraphQLResolveInfo,
		) => {
			let nodes: any[] = []
			let numberOFListings = faker.random.number({ min: 1, max: 10 })
			for (let i = 0; i < Math.min(numberOFListings, 5); i++) {
				nodes.push(fakeListing(parent))
			}
			return {
				pageInfo: {
					previous: nodes[0].id,
					next: numberOFListings > 5 ? UuidV4.generate().toString() : null,
				},
				edges: nodes.map(node => ({ node })),
				nodes: nodes,
				totalCount: numberOFListings,
			}
		},
	}
}

const fakeListing = (owner: any) => {
	owner = owner ? owner : fakeUser()
	return {
		id: UuidV4.generate().toString(),
		owner,
		title: faker.commerce.productName(),
		desc: faker.company.catchPhrase(),
		slug: `/${faker.lorem
			.words(faker.random.number({ min: 1, max: 4 }))
			.split(' ')
			.join('/')}/`,
	}
}

const fakeImage = () => ({
	url: faker.internet.avatar(),
})
export const mocks: IMocks = {
	// basic types
	UuidV4: (parent: any, params: any, ctx: Context, info: GraphQLResolveInfo) => UuidV4.generate().toString(),
	NonEmptyString: (parent: any, params: any, ctx: Context, info: GraphQLResolveInfo) => faker.lorem.word(),
	DateTime: (parent: any, params: any, ctx: Context, info: GraphQLResolveInfo) =>
		faker.date.between('01-01-2000', '04-20-2020'),

	// ListingConnection: (parent: any, params: any, ctx: Context, info: GraphQLResolveInfo) => {
	// 	const edges = faker.random.number({ min: 0, max: 8 })
	//
	// 	return {
	// 		edges: () => new MockList(edges),
	// 		totalCount: edges,
	// 	}
	// },

	Query: () => ({
		user: fakeUser,
	}),

	User: fakeUser,
	Image: fakeImage,
	Listing: fakeListing,
}
