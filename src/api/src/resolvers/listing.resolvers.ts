import { NonEmptyString } from '@demo/lib'
import { ListingClient } from './../clients/'
import { UserClient } from './../clients/'

import { GQLListingResolvers, GQLQueryResolvers, GQLUserResolvers } from '../_gen/server-types'

type ListingQueryResolver = GQLQueryResolvers['listing']

const listing: ListingQueryResolver = async (parent, { id }, context, info) => {
	let listing = await new ListingClient().findById(id)
	if (listing.ok) {
		return listing.value

		// DONT DO THIS!!! LET USERRESOLVER DO THE WORK
		// let owner = await new UserClient().findById(listing.value.owner)
		// return {
		// 	...listing.value,
		// 	owner: owner.ok ? owner.value : null,
		// }
	}

	return null
}

const baseResolvers: GQLListingResolvers = {
	id: async (parent, args, context, info) => {
		return parent.id
	},
	slug: async (parent, args, context, info) => {
		return new NonEmptyString(`/listing/${parent.id}`)
	},
	title: async (parent, args, context, info) => {
		if (parent.name) {
			return parent.name
		} else if (parent.id) {
			let listing = await new ListingClient().findById(parent.id)
			if (listing.ok) {
				return listing.value.title
			}
		}
	},
	owner: async (parent, args, context, info) => {
		if (parent.owner) {
			console.log("parent.owner",parent)

			let user = await new UserClient().findById(parent.owner)
			if (user.ok) {
				return user.value
			}
		} else if (parent.id) {
			console.log("parent.id",parent)
			let listing = await new ListingClient().findById(parent.id)
			if (listing.ok) {
				let user = await new UserClient().findById(listing.value.owner)
				if (user.ok) {
			console.log("user.value",user.value)
					return user.value
				}
			}
		}
	},
}

export const resolvers = {
	Query: { listing },
	Listing: baseResolvers,
}
