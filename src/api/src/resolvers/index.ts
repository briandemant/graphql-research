import { UuidV4ScalarType, DateTimeScalarType } from '@demo/lib'
import { GQLResolvers } from '../_gen/server-types'
import { resolvers as welcomeResolvers } from './welcome.resolvers'
import { resolvers as uuidResolvers } from './uuid.resolvers'
import { resolvers as nowResolvers } from './now.resolvers'
import { merge } from 'lodash'

console.log('welcome', welcomeResolvers)
console.log('uuid', uuidResolvers)
console.log('combined', merge([welcomeResolvers, uuidResolvers, nowResolvers]))

let allResolvers: GQLResolvers = merge(welcomeResolvers, uuidResolvers, nowResolvers, {
	ListingXXX: UuidV4ScalarType,
	UserXXX: UuidV4ScalarType,
	UuidV4: UuidV4ScalarType,
	DateTime: DateTimeScalarType,
})
export default allResolvers
