import { DateTimeScalarType, NonEmptyStringType, UuidV4ScalarType, ValidDateScalarType } from '@demo/lib'
import { flatMap, uniq } from 'lodash'
import { resolvers as listingResolvers } from './listing.resolvers'
import { resolvers as nowResolvers } from './now.resolvers'
import { resolvers as userResolvers } from './user.resolvers'
import { resolvers as utilResolvers } from './util.resolvers'
import { resolvers as welcomeResolvers } from './welcome.resolvers'

let combined = [welcomeResolvers, utilResolvers, nowResolvers, listingResolvers, userResolvers]

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
	Md5: DateTimeScalarType,
}

// let allResolvers: GQLResolvers = merge(resolvers, scalars)
let allResolvers = [...combined, scalars]
export default allResolvers
