import { UuidV4 } from '@demo/lib'
import { GQLQueryResolvers } from '../_gen/server-types'

type UuidQueryResolver = GQLQueryResolvers['uuid']
type ValidUuidQueryResolver = GQLQueryResolvers['validUuid']
type EchoUuidQueryResolver = GQLQueryResolvers['echoUuid']

const uuid: UuidQueryResolver = (parent, args, context, info) => {
	return UuidV4.generate()
}

const validUuid: ValidUuidQueryResolver = (parent, { id }, context, info) => {
	console.log('validUuid', id)
	return id ? UuidV4.validate(id) : false
}
const echoUuid: EchoUuidQueryResolver = (parent, { id }, context, info) => {
	console.log('echoUuid', id)
	if (id) {
		return id
	}
	throw UuidV4.ERR_INVALID_UUID
}

export const resolvers = { Query: { uuid, validUuid, echoUuid } }
