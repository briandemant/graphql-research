import { GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'
import { ListingClient, UserClient } from './../clients/'

type UserQueryResolver = GQLQueryResolvers['user']

const user: UserQueryResolver = async (parent, { id }, context, info) => {
	console.log(`looking for user by id : ${id}`)

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
		console.log('parent', parent)

		if (parent.name) {
			console.log('name used')
			return parent.name
		} else if (parent.id) {
			console.log('name : id used')
			let user = await new UserClient().findById(parent.id)
			if (user.ok) {
				return user.value.name
			}
		}
	},
	listings: async ({ id }, args, context, info) => {
		if (id) {
			console.log(`finding listings for user ${id}`)
			let all = await new ListingClient().findAll(l => l.owner == id.toString())
			console.log('Found :', all)

			if (all.ok) {
				return all.value.map(l => ({ id: l.id }))
			}
		}
		return []
	},
}

export const resolvers = {
	Query: { user },
	User: baseResolvers,
}
