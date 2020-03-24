import { UuidV4 } from '@demo/lib'
import { GQLUtilResolvers, ResolverType } from '../_gen/server-types'

type UuidResolverType = ResolverType<GQLUtilResolvers, 'uuid'>
type ValidUuidResolverType = ResolverType<GQLUtilResolvers, 'validUuid'>
type EchoUuidResolverType = ResolverType<GQLUtilResolvers, 'echoUuid'>
type NewFieldResolverType = ResolverType<GQLUtilResolvers, 'newField'>
type OldFieldResolverType = ResolverType<GQLUtilResolvers, 'oldField'>

export const uuid: UuidResolverType = (parent, args, ctx, info) => {
	return UuidV4.generate()
}

export const validUuid: ValidUuidResolverType = (parent, { idOrNot }, ctx, info) => {
	return UuidV4.validate(idOrNot)
}

export const echoUuid: EchoUuidResolverType = (parent, { id }, ctx, info) => {
	console.log('parent', parent)
	return id
}
export const newField: NewFieldResolverType = (parent, args, ctx, info) => {
	return JSON.stringify(info.path)
}

let utilResolvers: GQLUtilResolvers = {
	uuid,
	validUuid,
	echoUuid,
	newField,
	oldField: newField,
}

export const resolvers = {
	Util: utilResolvers,
	Query: {
		utils: () => ({ parent: true }),
	},
}
