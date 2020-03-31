import { isOk, NonEmptyString, UuidV4 } from '@demo/lib'
import { GQLListingResolvers, GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'
import { ListingIdResolverType } from '../_gen/base-resolvers'
import { GQLListing } from '../_gen/server-types'

export type ListingQueryResolverType = GQLQueryResolvers['listing']
export const listing: ListingQueryResolverType = async (_, { id }, { sources }) => {
	const res = await sources.listing.findById(id)
	console.log('### res', res)

	// WHY do you fail????!
	if (isOk(res)) {
		return res
	}

	return null
}

export const listingIdResolver: ListingIdResolverType = async (parent: GQLListing) => {
	return parent.id
}

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
