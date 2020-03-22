import { GraphQLScalarType } from 'graphql'
import * as semver from 'semver'
import SemVer from 'semver/classes/semver'

export class Version {
	private static readonly ERR_INVALID_VERSION = 'Invalid Version'

	static fromString = (s: string) => {
		let version = semver.coerce(s)
		if (semver.valid(version)) {
			return new Version(version!)
		} else {
			throw new Error(Version.ERR_INVALID_VERSION)
		}
	}

	constructor(private readonly version: SemVer) {
		if (!semver.valid(version)) {
			throw new Error(Version.ERR_INVALID_VERSION)
		}
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
	parseValue(value) {
		return Version.fromString(value)
	},
})
