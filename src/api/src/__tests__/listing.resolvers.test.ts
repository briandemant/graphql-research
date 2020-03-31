import { listing, listingIdResolver } from '../resolver/listing.resolvers'
import { fakeListing, fakeUser } from '../resolver/mocks'
import { UuidV4 } from '@demo/lib'
import { contextFn, Context } from '../schema/context'
import { GQLListing } from '../_gen/server-types'

const uuid = UuidV4.generate()
const mockedUser = fakeUser()
const mockedListing = fakeListing(mockedUser)

// Mock ResolveInfo

describe('Listing Resolvers', () => {
	// Mock context
	let mockedCtx: Context
	beforeAll(async () => (mockedCtx = await contextFn({ req: {}, res: {} }))) // TODO: wtf?!

	it('should be able to find Listing by id', async () => {
		const obj: Partial<GQLListing> = await listing({}, { id: new UuidV4(mockedListing.id) }, mockedCtx, {}) // TODO: mock GraphQLResolveInfo?!
		expect(obj.id).toEqual(mockedListing.id)
	})

	it("should be able to return a Listing's id", async () => {
		const mockListing: Partial<GQLListing> = {
			id: uuid,
		}
		const listingId = await listingIdResolver(mockListing, {}, mockedCtx, {}) // TODO: mock GraphQLResolveInfo?!
		expect(listingId).toEqual(uuid)
	})
})
