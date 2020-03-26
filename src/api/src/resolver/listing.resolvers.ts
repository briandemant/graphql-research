// import { isOk, NonEmptyString } from '@demo/lib'
//
// import { GQLListingResolvers, GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'
//
// type ListingQueryResolver = GQLQueryResolvers['listing']
//
// const listing: ListingQueryResolver = async (parent, { id }, { sources }, info) => {
// 	let listing = await sources.listing.findById(id)
// 	if (isOk(listing)) {
// 		return listing
// 	}
//
// 	return null
// }
//
// const baseResolvers: GQLListingResolvers = {
// 	id: async (parent, args, context, info) => {
// 		return parent.id
// 	},
// 	slug: async (parent, args, context, info) => {
// 		return new NonEmptyString(`/listing/${parent.id}`)
// 	},
// 	title: async (parent, args, { sources }, info) => {
// 		if (parent.name) {
// 			return parent.name
// 		} else if (parent.id) {
// 			let listing = await sources.listing.findById(parent.id)
// 			if (isOk(listing)) {
// 				return listing.title
// 			}
// 		}
// 	},
// 	owner: async (parent, args, { sources }, info) => {
// 		if (parent.owner) {
// 			let user = await sources.user.findById(parent.owner)
// 			if (isOk(user)) {
// 				return user
// 			}
// 		} else if (parent.id) {
// 			let listing = await sources.listing.findById(parent.id)
// 			if (isOk(listing)) {
// 				let user = await sources.user.findById(listing.owner)
// 				if (isOk(user)) {
// 					return user
// 				}
// 			}
// 		}
// 	},
// }
//
// export const resolvers = {
// 	Query: { listing },
// 	Listing: baseResolvers,
// }
