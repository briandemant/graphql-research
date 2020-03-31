import { EntityTypes, UuidV4 } from '../src/'

describe('UuidV4', () => {
	describe('UuidV4>OldID', () => {
		it('should be able to find Listing by id', async () => {
			const oldId = new UuidV4('user-id-321').fromOldId(EntityTypes.User, 123)
			expect(oldId.toString()).toEqual('user-id-123')
		})
	})
})
