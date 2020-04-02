import { GraphQLScalarType } from 'graphql'

const md5 = require('md5')

export class Md5 {
	private static readonly ERR_INVALID_HASH = 'Invalid MD5 hash'

	static fromString = (s: string) => new Md5(md5(s))

	constructor(private readonly hash: string) {
		if (!/^[a-f0-9]{32}$/.test(this.hash)) {
			throw new Error(Md5.ERR_INVALID_HASH)
		}
	}

	toString() {
		return this.hash
	}

	serialize() {
		return this.hash
	}
}

export const Md5StringType = new GraphQLScalarType({
	name: 'Md5',
	description: 'Just a string represents a MD5 Sum',
	serialize(value) {
		if (value instanceof Md5) {
			return value.serialize()
		} else {
			return new Md5(value).serialize()
		}
	},
	parseValue(value) {
		return new Md5(value)
	},
})

"https://api.brde.gg-dev.dk/modules/gg_blah/user/user_ads?fromDate=2002012312"
{
	toal:123
}
