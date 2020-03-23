import { GraphQLScalarType } from 'graphql'
import * as yup from 'yup'
import { fail, Maybe, ok } from './Maybe'

export class ValidURL {
	private static readonly ERR_INVALID_URL = 'Invalid URL'

	static parse(value: any) {
		try {
			return ok(new ValidURL(value))
		} catch (e) {
			return fail(e, value)
		}
	}

	constructor(private readonly url: string) {
		if (!yup.string().required().url(url)) {
			throw new Error(ValidURL.ERR_INVALID_URL)
		}
	}

	toString() {
		return this.url
	}

	serialize() {
		return this.url
	}
}

export const URLStringType = new GraphQLScalarType({
	name: 'URL',
	description: 'A string represents a valid web URL',
	serialize(value) {
		if (value instanceof ValidURL) {
			return value.serialize()
		} else {
			return new ValidURL(value).serialize()
		}
	},
	parseValue(value): Maybe<ValidURL> {
		return ValidURL.parse(value)
	},
})
