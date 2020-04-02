import { isParseError, ParseError, UuidV4, UuidV4ScalarType }  from '../../'
import { GraphQLScalarType } from 'graphql'
import { v4 } from 'uuid'

const validUuid = v4()
// seemingly correct uuid (but not)
const notAUuid = 'fbea692d-8666-4e18-1111-c90327f632f6'
const invalidIds = ['', notAUuid, 'user-id-73612a', 'qwe']

describe('UuidV4ScalarType', () => {
	describe('UuidV4 parse and serialize', () => {
		it('should be GraphQLScalarType', async () => {
			expect(UuidV4ScalarType).toBeInstanceOf(GraphQLScalarType)
		})

		it('should identify as UuidV4', async () => {
			expect(UuidV4ScalarType.name).toEqual('UuidV4')
		})

		it('should not parse invalid id', async () => {
			const id = UuidV4ScalarType.parseValue('fixx')

			expect(id).not.toBeInstanceOf(UuidV4)
			expect(id).toBeInstanceOf(ParseError)

			if (isParseError(id)) {
				expect(id.value).toBe('fixx')
			} else {
				throw new Error('should have been identified as a ParseError')
			}
		})

		it('should serialize UuidV4s', async () => {
			const id = new UuidV4('listing-id-123')
			expect(UuidV4ScalarType.serialize(id)).toEqual('listing-id-123')
		})

		it('should serialize valid strings', async () => {
			expect(UuidV4ScalarType.serialize(validUuid)).toEqual(validUuid)
		})
	})

})
