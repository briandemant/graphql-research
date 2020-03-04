import { UuidV4ScalarType, DateTimeScalarType, SimpleID, SimpleIDScalarType, NonEmptyStringType } from '@demo/lib'
import { GQLResolvers } from '../_gen/server-types'
import { resolvers as welcomeResolvers } from './welcome.resolvers'
import { resolvers as utilResolvers } from './util.resolvers'
import { resolvers as nowResolvers } from './now.resolvers'
import { resolvers as listingResolvers } from './listing.resolvers'
import { resolvers as userResolvers } from './user.resolvers'
import { flatMap, uniq } from 'lodash'
const { buildFederatedSchema } = require('@apollo/federation');

let combined = [welcomeResolvers, utilResolvers, nowResolvers, listingResolvers, userResolvers]

uniq(flatMap(combined, x => Object.keys(x)))
	.filter(x => x !== 'Query')
	.forEach(root => {
		console.log(
			`${root} :`,
			flatMap(combined, (x: any) => x[root] && Object.keys(x[root]))
				.filter(x => x)
				.join(', ')
		)
	})
let scalars = {
	SimpleID: SimpleIDScalarType,
	NonEmptyString: NonEmptyStringType,
	UuidV4: UuidV4ScalarType,
	DateTime: DateTimeScalarType,
}

// let allResolvers: GQLResolvers = merge(resolvers, scalars)
let allResolvers = [...combined, scalars]
export default allResolvers
