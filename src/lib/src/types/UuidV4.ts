import { GraphQLScalarType } from 'graphql'
import { v4 } from 'uuid'
import { fail, Maybe, MaybeError, ok, ParseError } from './Maybe'

const isUUID = require('is-uuid')

export enum EntityTypes {
	User = 'user',
	Listing = 'listing',
}

const OLDID = /([a-z]{4,8})-id-([0-9]{1,12})/

export const isOldId = (value: UuidV4 | string) => {
	if (typeof value === 'string') {
		return OLDID.test(value)
	} else {
		return OLDID.test(value.toString())
	}
}

export class UuidV4 {
	public static readonly ERR_INVALID_UUID = 'Invalid UUID'

	static generate = () => new UuidV4(v4())
	static validate: (uuid: string) => boolean = (uuid: string) => isUUID.v4(uuid)

	static parse(value: any) {
		try {
			return ok(new UuidV4(value))
		} catch (e) {
			return fail(e, value)
		}
	}

	constructor(private readonly uuid: string) {
		// d3d3a8d7-a8ab-4f2b-b3a0-64adefc02b37
		// 12345678-0000-0000-0000-123456789012

		if (this.isOldId()) {
			// this is a fake uuid
		} else if (!UuidV4.validate(this.uuid)) {
			throw new Error(UuidV4.ERR_INVALID_UUID)
		}
	}

	fromOldId(type: EntityTypes, id: number) {
		return `${type}-id-${id}`
	}

	toOldId(): { type: EntityTypes; id: number } {
		const res = OLDID.exec(this.uuid)
		if (res) {
			const type: EntityTypes | undefined = (EntityTypes as any)[res[1]]
			const id = parseInt(res[2], 10)
			if (type && id > 0) {
				return {
					type,
					id,
				}
			}
		}
		throw new Error(`Invalid old id '${this.uuid}'`)
	}

	toString() {
		return this.uuid
	}

	serialize() {
		return this.uuid
	}

	private isOldId() {
		return isOldId(this.uuid)
	}
}

export const UuidV4ScalarType = new GraphQLScalarType({
	name: 'UuidV4',
	description: "UUID v4 scalar type (with support for legacy id's ([type]-id-[id])",
	serialize(value) {
		if (value instanceof UuidV4) {
			return value.serialize()
		} else {
			return new UuidV4(value).serialize()
		}
	},
	parseValue(value): Maybe<UuidV4> {
		return UuidV4.parse(value)
	},
})
