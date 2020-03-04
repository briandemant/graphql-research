import { NonEmptyString, SimpleID } from '@demo/lib'
import { Context } from '../schema/context'
import { UserClient } from './../clients/'

import { GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'
import { GraphQLResolveInfo } from 'graphql/type/definition'

type UserQueryResolver = GQLQueryResolvers['user']

const user: UserQueryResolver = async (parent, { id }, context, info) => {
	console.log(`looking for user by id : ${id}`)

	let user = await new UserClient().findById(id)
	if (user.ok) {
		return user.value
	}

	return null
}

const baseResolvers: GQLUserResolvers | { __resolveReference: any } = {
	__resolveReference: ({ id }: { id: SimpleID }, context: Context, info: GraphQLResolveInfo) => {
		console.log("__resolveReference(object)")
	},
	id: async (parent, args, context, info) => {
		return parent.id
	},
	name: async (parent, args, context, info) => {
		console.log('parent', parent)

		if (parent.name) {
			console.log('name used')

			return parent.name
		} else if (parent.id) {
			console.log('id used')
			let user = await new UserClient().findById(parent.id)
			if (user.ok) {
				return user.value.name
			}
		}
	},
}

export const resolvers = {
	Query: { user },
	User: baseResolvers,
}
