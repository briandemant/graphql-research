// import { isError, isOk } from '@demo/lib'
// import { GQLListingConnection, GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'
//
// type UserQueryResolver = GQLQueryResolvers['user']
//
// const user: UserQueryResolver = async (parent, { id }, { sources }, info) => {
// 	const user = await sources.user.findById(id)
// 	if (isOk(user)) {
// 		return user
// 	}
// 	return null
// }
//
// // this is just to show we can create and test these individually
// // TODO: correctly Type the result
// export let listingConnection: GQLUserResolvers['listingConnection'] = async (
// 	{ id },
// 	{ term, reverse, cursor, sortBy },
// 	{ sources },
// 	info
// ) => {
// 	const emptyResult: GQLListingConnection = {
// 		pageInfo: {
// 			previous: '',
// 			next: '',
// 		},
// 		totalCount: 0,
// 		edges: [],
// 		nodes: [],
// 	}
//
// 	if (!id) {
// 		return emptyResult
// 	}
//
// 	const all = await sources.listing.findAll(l => l.owner == id.toString())
//
// 	if (isError(all)) {
// 		return emptyResult
// 	}
//
// 	// TODO: the owner of the data is responsible for the pagination logic
// 	const limit = (cursor && cursor.limit) || 5
// 	const before = cursor && cursor.before
// 	const beforeIdx = before && all.findIndex(el => el.id.toString() === before)
// 	const after = cursor && cursor.after
// 	const afterIdx = after && all.findIndex(el => el.id.toString() === after)
//
// 	// cursor based pagination, implemented with array_slice
// 	let paginatedResults = all.sort(
// 		// default sort by id ASC
// 		(a, b) => parseInt(a.id.toString().substr(3), 10) - parseInt(b.id.toString().substr(3), 10)
// 	)
//
// 	// out of bounds
// 	if ((beforeIdx && beforeIdx < 0) || (afterIdx && afterIdx < 0)) {
// 		// throw pagination error
// 		throw Error('cursor out of bounds!')
// 	}
//
// 	// slice by cursor
// 	if (beforeIdx) {
// 		paginatedResults = paginatedResults.slice(0, beforeIdx)
// 	}
//
// 	if (afterIdx) {
// 		paginatedResults = paginatedResults.slice(afterIdx + 1, paginatedResults.length)
// 	}
//
// 	// chunk it
// 	paginatedResults = paginatedResults.slice(0, limit)
//
// 	// reverse it?
// 	if (reverse) {
// 		paginatedResults.reverse()
// 	}
//
// 	return {
// 		pageInfo: emptyResult.pageInfo, // TODO
// 		edges: paginatedResults.map(listing => ({
// 			node: listing,
// 		})),
// 		nodes: paginatedResults,
// 		totalCount: all.length,
// 	}
// }
//
// const baseResolvers: GQLUserResolvers = {
// 	id: async (parent, args, context, info) => {
// 		throw new Error('why would this ever be called?')
// 	},
//
// 	name: async (parent, args, { sources }, info) => {
// 		if (parent.name) {
// 			return parent.name
// 		} else if (parent.id) {
// 			const user = await sources.user.findById(parent.id)
// 			if (isOk(user)) {
// 				return user.name
// 			}
// 		}
// 	},
//
// 	listings: async ({ id }, args, { sources }, info) => {
// 		if (id) {
// 			const all = await sources.listing.findAll(l => l.owner == id.toString())
// 			if (isOk(all)) {
// 				return all.map(l => ({ id: l.id }))
// 			}
// 		}
// 		return []
// 	},
//
// 	listingConnection,
//
// 	favoriteListingsConnection: async ({ id }, { pagination }, { sources }, info) => {
// 		const emptyResult: GQLListingConnection = {
// 			pageInfo: {
// 				previous: '',
// 				next: '',
// 			},
// 			totalCount: 0,
// 			edges: [],
// 			nodes: [],
// 		}
// 		if (!id) {
// 			return emptyResult
// 		}
// 		// listings by other users
// 		const all = await sources.listing.findAll(l => l.owner != id.toString())
//
// 		if (isError(all)) {
// 			return emptyResult
// 		}
// 		// TODO: the owner of the data is responsible for the pagination logic
// 		const limit = (pagination && pagination.limit) || 5
// 		const page = (pagination && pagination.page) || 1
//
// 		// limit+offset based pagination, implemented with array_slice
// 		const paginatedResults = all
// 			.sort(
// 				// default sort by id ASC
// 				(a, b) => parseInt(a.id.toString().substr(3), 10) - parseInt(b.id.toString().substr(3), 10)
// 			)
// 			.slice((page - 1) * limit, page * limit)
//
// 		return {
// 			pageInfo: emptyResult.pageInfo, // TODO
// 			edges: paginatedResults.map(listing => ({
// 				node: listing,
// 			})),
// 			nodes: paginatedResults,
// 			totalCount: all.length,
// 		}
// 	},
//
// 	luckyNumber(parent, args, context, info) {
// 		return Math.round(Math.random() * 100)
// 	},
// }
//
// export const resolvers = {
// 	Query: { user },
// 	User: baseResolvers,
// }
