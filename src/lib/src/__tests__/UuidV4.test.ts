import { v4 } from 'uuid'
import { isOldId, isParseError, OldIdTypes, ParseError, UuidV4 } from '../'

const isUUID = require('is-uuid')

const validUuid = v4()
// seemingly correct uuid (but not)
const notAUuid = 'fbea692d-8666-4e18-1111-c90327f632f6'
const invalidIds = ['', notAUuid, 'user-id-73612a', 'qwe']

describe('UuidV4', () => {
	describe('UuidV4 constructor', () => {
		it('should accept uuid', async () => {
			const id = new UuidV4('fbea692d-8666-4e18-a8e8-c90327f632f6')
		})
		it('should accept old id', async () => {
			const id = new UuidV4('user-id-55555')
		})

		invalidIds.forEach((id: string) => {
			it(`should throw if invalid id : '${id}'`, async () => {
				expect(() => {
					new UuidV4(id)
				}).toThrow(/Invalid UUID/)
			})
		})
	})

	describe('UuidV4 using OldID', () => {
		it('should create oldid\'s that matches the types', async () => {
			const oldId1 = UuidV4.fromOldId(OldIdTypes.User, 123)
			expect(oldId1.toString()).toEqual('user-id-123')

			const oldId2 = UuidV4.fromOldId(OldIdTypes.Listing, 434)
			expect(oldId2.toString()).toEqual('listing-id-434')
		})


		it('should test if an ID or a string is an old id', async () => {
			const oldId1 = new UuidV4('user-id-123')
			expect(isOldId(oldId1)).toBe(true)

			expect(isOldId('message-id-123')).toBe(true)
		})
		it('should extract oldid\'s from the fake uuids', async () => {
			const oldId1 = new UuidV4('user-id-123')
			expect(oldId1.toOldId()).toEqual({ type: OldIdTypes.User, id: 123 })

			const oldId2 = UuidV4.fromOldId(OldIdTypes.Listing, 345)
			expect(oldId2.toOldId()).toEqual({ type: OldIdTypes.Listing, id: 345 })
		})
	})


	describe('UuidV4 using UUID', () => {
		it('should not identify uuids as old ids', async () => {
			const id = new UuidV4('fbea692d-8666-4e18-a8e8-c90327f632f6')
			expect(isOldId(id)).toBe(false)
			expect(isOldId('fbea692d-8666-4e18-a8e8-c90327f632f6')).toBe(false)
		})
		it('should throw if attempt to convert to oldid', async () => {
			const id = new UuidV4('fbea692d-8666-4e18-a8e8-c90327f632f6')
			expect(() => {
				id.toOldId()
			}).toThrow(/Invalid old id/)
		})
	})

	describe('UuidV4 parse and serialize', () => {
		it('should parse uuids', async () => {

			const id = UuidV4.parse(validUuid)
			expect(id).toBeInstanceOf(UuidV4)
		})
		it('should parse old ids', async () => {
			const id = UuidV4.parse('listing-id-123')
			expect(id).toBeInstanceOf(UuidV4)
		})
		it('should not parse invalid id', async () => {
			const id = UuidV4.parse('fixx')
			expect(id).not.toBeInstanceOf(UuidV4)
			expect(id).toBeInstanceOf(ParseError)
			if (isParseError(id)) {
				expect(id.value).toBe('fixx')
			} else {
				throw new Error('should have been identified as a ParseError')
			}
		})


		it('should serialize old ids', async () => {
			const id = new UuidV4('listing-id-123')
			expect(id.serialize()).toEqual('listing-id-123')
		})
		it('should serialize uuids', async () => {
			const id = new UuidV4(validUuid)
			expect(id.serialize()).toEqual(validUuid)
		})
	})

	it('should generate uuids', async () => {
		const id = UuidV4.generate()
		expect(isUUID.v4(id.toString())).toBeTruthy()
	})
	it('should validate uuids', async () => {
		const id = UuidV4.generate()
		expect(UuidV4.validate(id.toString())).toBeTruthy()
	})
})
