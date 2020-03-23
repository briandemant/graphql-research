import { GraphQLScalarType } from 'graphql'
import * as semver from 'semver'
import SemVer from 'semver/classes/semver'
import { fail, Maybe, ok, ParseError } from './Maybe'
import { ValidDate } from './ValidDate'

export class Version {
	private static readonly ERR_INVALID_VERSION = 'Invalid Version'

	static parse(value: any) {
		try {
			return ok(new Version(value))
		} catch (e) {
			return fail(e, value)
		}
	}

	constructor(private readonly version: SemVer) {
		if (!semver.valid(version)) {
			throw new Error(Version.ERR_INVALID_VERSION)
		}
		// console.log(semver.parse(version))
	}

	toString() {
		return this.version.version
	}

	serialize() {
		return this.version.version
	}
}


export const VersionStringType = new GraphQLScalarType({
	name: 'Version',
	description: 'Just a string represents a valid semver Version',
	serialize(value) {
		if (value instanceof Version) {
			return value.serialize()
		} else {
			return new Version(value).serialize()
		}
	},
	parseValue(value): Maybe<Version> {
		return Version.parse(value)
	},
})
