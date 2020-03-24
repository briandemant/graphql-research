import {
	EmailStringType,
	Md5StringType,
	NonEmptyStringType,
	URLStringType,
	UuidV4ScalarType,
	ValidDateScalarType,
	VersionStringType,
} from '@demo/lib'
import { readFileSync } from 'fs'
import { flatMap, uniq } from 'lodash'

export * from './mocks'

// import { resolvers as listingResolvers } from './listing.resolvers'
// import { resolvers as nowResolvers } from './now.resolvers'
// import { resolvers as userResolvers } from './user.resolvers'
// import { resolvers as utilResolvers } from './util.resolvers'
// import { resolvers as welcomeResolvers } from './welcome.resolvers'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// let combined = [welcomeResolvers, utilResolvers, nowResolvers, listingResolvers, userResolvers]
let combined = [{
	Query: {
		apiVersion: () => pkg.version,
	},
}]

uniq(flatMap(combined, x => Object.keys(x)))
	.filter(x => x !== 'Query')
	.forEach(root => {
		console.log(
			`${root} :`,
			flatMap(combined, (x: any) => x[root] && Object.keys(x[root]))
				.filter(x => x)
				.join(', '),
		)
	})

let scalars = {
	NonEmptyString: NonEmptyStringType,
	UuidV4: UuidV4ScalarType,
	DateTime: ValidDateScalarType,
	Version: VersionStringType,
	URL: URLStringType,
	Email: EmailStringType,
	Md5: Md5StringType,
}

// let allResolvers: GQLResolvers = merge(resolvers, scalars)
export const resolvers = [...combined, scalars]
