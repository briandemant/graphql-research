import { listing, listingIdResolver } from '../resolver/listing.resolvers'
import { fakeListing, fakeUser } from '../resolver/mocks'
import { UuidV4 } from '@demo/lib'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../schema/context'
import { GQLListing } from '../_gen/server-types'

const uuid = UuidV4.generate()
const mockedUser = fakeUser()
const mockedListing = fakeListing(mockedUser)
const findById = jest.fn(id => {
	return { ...mockedListing, id }
})
const fakeInfo: GraphQLResolveInfo = {} as GraphQLResolveInfo
const mockedCtx: Context = ({
	sources: {
		listing: {
			findById,
		},
	},
} as unknown) as Context

describe('Listing Resolvers', () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})
	it('should be able to find Listing by id', async () => {
		const obj: GQLListing = await listing({}, { id: new UuidV4(mockedListing.id) }, mockedCtx, fakeInfo)
		expect(findById).toHaveBeenCalled() // Mocking works
		// expect(obj.id).toEqual(mockedListing.id) // return value matches
	})

	it("should be able to return a Listing's id", async () => {
		const mockListing: GQLListing = {
			id: uuid,
		} as GQLListing
		const listingId = await listingIdResolver(mockListing, {}, mockedCtx, fakeInfo)
		expect(findById).toHaveBeenCalledTimes(0) // Mocking works
		expect(listingId).toEqual(uuid)
	})
})
