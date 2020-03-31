import { UuidV4 } from '@demo/lib'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'

import { GraphQLResolveInfo } from 'graphql'
import { GQLListing } from '../_gen/server-types'
import { listing, listingIdResolver } from '../resolver/listing.resolvers'
import { fakeListing, fakeUser } from '../resolver/mocks'
import { Context, contextFn } from '../schema/context'

const uuid = UuidV4.generate()
const mockedUser = fakeUser()
const mockedListing = fakeListing(mockedUser)

// Mock ResolveInfo

describe.skip('Listing Resolvers', () => {
	// Mock context
	let mockedCtx: Context
	beforeAll(async () => (mockedCtx = await contextFn({ req: {}, res: {} } as ExpressContext))) // TODO: wtf?!

	it('should be able to find Listing by id', async () => {
		const obj: Partial<GQLListing> = await listing({}, { id: new UuidV4(mockedListing.id) }, mockedCtx as Context, {} as GraphQLResolveInfo) // TODO: mock GraphQLResolveInfo?!
		expect(obj.id).toEqual(mockedListing.id)
	})

	it('should be able to return a Listing\'s id', async () => {
		const mockListing: Partial<GQLListing> = {
			id: uuid,
		}
		const listingId = await listingIdResolver(mockListing, {}, mockedCtx as Context, {} as GraphQLResolveInfo) // TODO: mock GraphQLResolveInfo?!
		expect(listingId).toEqual(uuid)
	})
})
