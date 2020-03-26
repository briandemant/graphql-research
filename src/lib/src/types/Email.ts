import { GraphQLScalarType } from 'graphql'
import * as yup from 'yup'
import { fail, Maybe, ok } from './Maybe'

export class ValidEmail {
	private static readonly ERR_INVALID_EMAIL = 'Invalid Email'

	static parse(value: any) {
		try {
			return ok(new ValidEmail(value))
		} catch (e) {
			return fail(e, value)
		}
	}

	constructor(private readonly email: string) {
		if (
			!yup
				.string()
				.required()
				.email(email)
		) {
			throw new Error(ValidEmail.ERR_INVALID_EMAIL)
		}
	}

	toString() {
		return this.email
	}

	serialize() {
		return this.email
	}
}

export const EmailStringType = new GraphQLScalarType({
	name: 'Email',
	description: 'A string represents a valid email',
	serialize(value) {
		if (value instanceof ValidEmail) {
			return value.serialize()
		} else {
			return new ValidEmail(value).serialize()
		}
	},
	parseValue(value): Maybe<ValidEmail> {
		return ValidEmail.parse(value)
	},
})
