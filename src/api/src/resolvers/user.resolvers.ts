import { GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'
import { DataListing, ListingClient, UserClient } from './../clients/'

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
	listingConnection: async ({ id }, { first = 5, after = '' }, context, info) => {
		if (id) {
			let all = await new ListingClient().findAll(l => l.owner == id.toString())
			if (all.ok) {
				type ReducerAcc = {
					results: Readonly<DataListing>[]
					started: boolean
					endCursor: false | string
					hasMore: boolean
				}

				let afterCursor = after ? parseInt(after.substr(3), 10) : 0
				let reducer = (acc: ReducerAcc, next: Readonly<DataListing>, idx: number) => {
					if (acc.endCursor) return { ...acc, hasMore: true }

					if (!acc.started && parseInt(next.id.toString().substr(3), 10) > afterCursor) {
						acc.started = true
					}

					if (acc.started) {
						acc.results.push(next)
						if (acc.results.length == first) {
							acc.endCursor = next.id.toString()
						}
					}

					return acc
				}

				const { results, endCursor, hasMore } = all.value.reduce(reducer, {
					results: [],
					started: !after,
					endCursor: false,
					hasMore: false,
				})

				return {
					pageInfo: {
						hasNextPage: hasMore,
						endCursor: endCursor,
					},
					edges: results.map(listing => ({
						cursor: listing.id.toString(),
						node: listing,
					})),
				}
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
