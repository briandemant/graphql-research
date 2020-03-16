import { GQLQueryResolvers, GQLUserResolvers, GQLPageInfo } from '../_gen/server-types'
import { DataListing, ListingClient, UserClient } from './../clients/'

type UserQueryResolver = GQLQueryResolvers['user']

interface ReducerAcc {
	results: Readonly<DataListing>[]
	started: boolean
	endCursor: false | string
	hasMore: boolean
}

const user: UserQueryResolver = async (parent, { id }, context, info) => {
	const userResp = await new UserClient().findById(id)
	if (userResp.ok) {
		return userResp.value
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
			const userResp = await new UserClient().findById(parent.id)
			if (userResp.ok) {
				return userResp.value.name
			}
		}
	},
	listings: async ({ id }, args, context, info) => {
		if (id) {
			const all = await new ListingClient().findAll(l => l.owner === id.toString())
			if (all.ok) {
				return all.value.map(l => ({ id: l.id }))
			}
		}
		return []
	},
	listingConnection: async ({ id }, { reverse, cursor }, context, info) => {
		if (id) {
			const all = await new ListingClient().findAll(l => l.owner === id.toString())
			if (!all.ok) {
				return []
			}
			console.log('###listingConnection:: ',all)

			// pagination (TODO: the owner of the data is responsible for pagination logic)
			const afterCursor = cursor && cursor.after ? parseInt(cursor.after.substr(3), 10) : 0
			const beforeCursor = cursor && cursor.before ? parseInt(cursor.before.substr(3), 10) : 0

			// array slice for cursor based pagination
			return {
				pageInfo: {
					previousPage: true,
					nextPage: true,
				} as GQLPageInfo,
				edges: all.value.map(listing => ({
					cursor: listing.id.toString(),
					node: listing,
				})),
			}
		}
	},
	luckyNumber(parent, args, context, info) {
		return Math.round(Math.random() * 100)
	},
}

export const resolvers = {
	Query: { user },
	User: baseResolvers,
}
