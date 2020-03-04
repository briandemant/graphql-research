import { GraphQLScalarType } from 'graphql'
import { v4 } from 'uuid'

const isUUID = require('is-uuid')

export const UuidV4ScalarType = new GraphQLScalarType({
	name: 'UuidV4',
	description: 'UUID v4 scalar type',
	serialize(value) {
		console.log('serialize', value)
		if (UuidV4.validate(value)) {
			return value.serialize()
		}
	},
	parseValue(value) {
		console.log('parseValue', value)
		// try {
			return new UuidV4(value)
		// } catch (e) {
		// 	return null
		// }
	}
})

export class UuidV4 {
	public static readonly ERR_INVALID_UUID = 'invalid uuid'

	static generate = () => new UuidV4(v4())
	static validate: (uuid: string) => boolean = (uuid: string) => isUUID.v4(uuid)

	constructor(private uuid: string) {
		if (!UuidV4.validate(this.uuid)) {
			throw new Error(UuidV4.ERR_INVALID_UUID)
		}
	}

	public toString() {
		return this.uuid
	}

	public serialize() {
		return this.uuid
	}
}
