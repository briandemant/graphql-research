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
			info: GraphQLResolveInfo
		) => {
			return {
				edges: [
					{
						node: fakeListing(parent),
					},
				],
				totalCount: 11,
			}
		},
	}
}

const fakeListing = (owner: any) => {
	owner = owner ? owner : fakeUser()
	return {
		owner,
		title: faker.commerce.productName(),
		desc: faker.company.catchPhrase(),
		slug: `/${faker.lorem
			.words(faker.random.number(2) + 1)
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

	Query: () => ({
		user: fakeUser,
	}),

	User: fakeUser,
	Image: fakeImage,
	Listing: fakeListing,
}
