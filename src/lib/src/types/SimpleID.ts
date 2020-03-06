import { GraphQLScalarType } from 'graphql'

let counter = 0

export class SimpleID {
	private static readonly ERR_INVALID_ID = 'Invalid Simple ID'

	static generate = () => `ID#${++counter}`
	static validate: (id: string) => boolean = (id: string) => !!id.match(/^ID#[0-9]$/)
	static fromInt(id: number) {
		if (counter < id) {
			counter = id
		}
		return new SimpleID(`ID#${id}`)
	}

	constructor(private readonly id: string) {
		if (!SimpleID.validate(this.id)) {
			throw new Error(SimpleID.ERR_INVALID_ID)
		}
	}

	equal(otherId: string | SimpleID) {
		return this.id === otherId.toString()
	}
	toString() {
		return this.id
	}

	serialize() {
		return this.id
	}
}

export const SimpleIDScalarType = new GraphQLScalarType({
	name: 'SimpleID',
	description: 'Just a small simple ID scalar type',
	serialize(value) {
		if (value instanceof SimpleID) {
			return value.serialize()
		} else {
			return new SimpleID(value).serialize()
		}
	},
	parseValue(value) {
		return new SimpleID(value)
	},
})
