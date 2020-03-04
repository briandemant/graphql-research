import { GraphQLScalarType } from 'graphql'
import { SimpleID } from './SimpleID'

export class NonEmptyString {
	private static readonly ERR_EMPTY_STRING = 'empty string'

	private readonly s: string

	constructor(s: string | NonEmptyString) {
		let trimmed: string
		console.log("s",s)

		if (s instanceof NonEmptyString) {
			trimmed = s.toString()
		} else {
			trimmed = s.trim()
			if (trimmed.length < 1) {
				throw new Error(NonEmptyString.ERR_EMPTY_STRING)
			}
		}

		this.s = trimmed
	}

	toString() {
		return this.s
	}
}

export const NonEmptyStringType = new GraphQLScalarType({
	name: 'NonEmptyString',
	description: 'Just a string that cannot be empty',
	serialize(value) {
		return new NonEmptyString(value).toString()
	},
	parseValue(value) {
		return new NonEmptyString(value)
	},
})
