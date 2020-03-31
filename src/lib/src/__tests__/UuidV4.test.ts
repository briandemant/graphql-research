import { OldIdTypes, UuidV4 } from '../'

describe('UuidV4', () => {
	describe('UuidV4 using OldID', () => {
		it('should create oldid\'s that matches the types', async () => {
			const oldId1 = UuidV4.fromOldId(OldIdTypes.User, 123)
			expect(oldId1.toString()).toEqual('user-id-123')

			const oldId2 = UuidV4.fromOldId(OldIdTypes.Listing, 434)
			expect(oldId2.toString()).toEqual('listing-id-434')
		})


		it('should extract oldid\'s from the fake uuids', async () => {
			const oldId1 = new UuidV4('user-id-123')
			expect(oldId1.toOldId()).toEqual({ type: OldIdTypes.User, id: 123 })

			const oldId2 = UuidV4.fromOldId(OldIdTypes.Listing, 345)
			expect(oldId2.toOldId()).toEqual({ type: OldIdTypes.Listing, id: 345 })
		})
	})
})
