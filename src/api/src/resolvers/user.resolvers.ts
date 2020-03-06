import { GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'
import { ListingClient, UserClient } from './../clients/'

type UserQueryResolver = GQLQueryResolvers['user']

const user: UserQueryResolver = async (parent, { id }, context, info) => {
	let user = await new UserClient().findById(id)
	if (user.ok) {
		return user.value
	}
	return null
}

const baseResolvers: GQLUserResolvers = {
	id: async (parent, args, context, info) => {
		return parent.id
	},
	name: async (parent, args, context, info) => {
		if (parent.name) {
			return parent.name
		} else if (parent.id) {
			let user = await new UserClient().findById(parent.id)
			if (user.ok) {
				return user.value.name
			}
		}
	},
	listings: async ({ id }, args, context, info) => {
		if (id) {
			let all = await new ListingClient().findAll(l => l.owner == id.toString())
			if (all.ok) {
				return all.value.map(l => ({ id: l.id }))
			}
		}
		return []
	},
	luckyNumber(parent, args, context, info) {
		return Math.round(Math.random() * 100)
	},
}

export const resolvers = {
	Query: { user },
	User: baseResolvers,
}
