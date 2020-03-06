import { GraphQLScalarType } from 'graphql'

export class NonEmptyString {
	private static readonly ERR_EMPTY_STRING = 'Empty String'

	private readonly str: string

	constructor(str: string) {
		let trimmed = str.trim()

		if (trimmed.length < 1) {
			throw new Error(NonEmptyString.ERR_EMPTY_STRING)
		}

		this.str = trimmed
	}

	toString() {
		return this.str
	}
	serialize() {
		return this.str
	}
}

export const NonEmptyStringType = new GraphQLScalarType({
	name: 'NonEmptyString',
	description: 'Just a string that cannot be empty',
	serialize(value) {
		if (value instanceof NonEmptyString) {
			return value.serialize()
		} else {
			return new NonEmptyString(value).serialize()
		}
	},
	parseValue(value) {
		return new NonEmptyString(value)
	},
})
