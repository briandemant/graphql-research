import { GraphQLScalarType } from 'graphql'
import { v4 } from 'uuid'

const isUUID = require('is-uuid')

export class UuidV4 {
	public static readonly ERR_INVALID_UUID = 'Invalid UUID'

	static generate = () => new UuidV4(v4())
	static validate: (uuid: string) => boolean = (uuid: string) => isUUID.v4(uuid)

	constructor(private readonly uuid: string) {
		if (!UuidV4.validate(this.uuid)) {
			throw new Error(UuidV4.ERR_INVALID_UUID)
		}
	}

	toString() {
		return this.uuid
	}

	serialize() {
		return this.uuid
	}
}

export const UuidV4ScalarType = new GraphQLScalarType({
	name: 'UuidV4',
	description: 'UUID v4 scalar type',
	serialize(value) {
		if (value instanceof UuidV4) {
			return value.serialize()
		} else {
			return new UuidV4(value).serialize()
		}
	},
	parseValue(value) {
		return new UuidV4(value)
	},
})
