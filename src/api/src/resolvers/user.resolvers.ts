import { GQLQueryResolvers, GQLUserResolvers, GQLPageInfo, GQLListingConnection } from '../_gen/server-types'
import { DataListing, ListingClient, UserClient } from './../clients/'

type UserQueryResolver = GQLQueryResolvers['user']

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
			const all = await new ListingClient().findAll(l => l.owner == id.toString())
			if (all.ok) {
				return all.value.map(l => ({ id: l.id }))
			}
		}
		return []
	},
	// TODO: correctly Type the result
	listingConnection: async ({ id }, { term, reverse, cursor }, context, info): Promise<any> => {
		const emptyResult: GQLListingConnection = {
			pageInfo: {
				previous: '',
				next: '',
			},
			totalCount: 0,
			edges: [],
			nodes: [],
		}

		if (!id) {
			return emptyResult
		}

		const all = await new ListingClient().findAll(l => l.owner == id.toString())

		if (!all.ok) {
			return emptyResult
		}

		// TODO: the owner of the data is responsible for the pagination logic
		const size = (cursor && cursor.size) || 5
		const before = cursor && cursor.before
		const beforeIdx = before && all.value.findIndex(el => el.id.toString() === before)
		const after = cursor && cursor.after
		const afterIdx = after && all.value.findIndex(el => el.id.toString() === after)

		// cursor based pagination, implemented with array_slice
		let paginatedResults = all.value.sort(
			// default sort by id ASC
			(a, b) => parseInt(a.id.toString().substr(3), 10) - parseInt(b.id.toString().substr(3), 10)
		)

		// out of bounds
		if ((beforeIdx && beforeIdx < 0) || (afterIdx && afterIdx < 0)) {
			// throw pagination error
			throw Error('cursor out of bounds!')
		}

		// slice by cursor
		if (beforeIdx) {
			paginatedResults = paginatedResults.slice(0, beforeIdx)
		}

		if (afterIdx) {
			paginatedResults = paginatedResults.slice(afterIdx + 1, paginatedResults.length)
		}

		// chunk it
		paginatedResults = paginatedResults.slice(0, size)

		// reverse it?
		if (reverse) {
			paginatedResults.reverse()
		}

		return {
			pageInfo: emptyResult.pageInfo, // TODO
			edges: paginatedResults.map(listing => ({
				node: listing,
			})),
			nodes: paginatedResults,
			totalCount: all.value.length,
		}
	},

	favoriteListingsConnection: async ({ id }, { pagination }, ctx, info) => {
		const emptyResult: GQLListingConnection = {
			pageInfo: {
				previous: '',
				next: '',
			},
			totalCount: 0,
			edges: [],
			nodes: [],
		}
		if (!id) {
			return emptyResult
		}
		// listings by other users
		const all = await new ListingClient().findAll(l => l.owner != id.toString())

		if (!all.ok) {
			return emptyResult
		}
		// TODO: the owner of the data is responsible for the pagination logic
		const size = (pagination && pagination.size) || 5
		const page = (pagination && pagination.page) || 1

		// limit+offset based pagination, implemented with array_slice
		const paginatedResults = all.value
			.sort(
				// default sort by id ASC
				(a, b) => parseInt(a.id.toString().substr(3), 10) - parseInt(b.id.toString().substr(3), 10)
			)
			.slice((page - 1) * size, page * size)

		return {
			pageInfo: emptyResult.pageInfo, // TODO
			edges: paginatedResults.map(listing => ({
				node: listing,
			})),
			nodes: paginatedResults,
			totalCount: all.value.length,
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
