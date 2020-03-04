import { ListingClient } from './../clients/'
import { UserClient } from './../clients/'

import { GQLQueryResolvers } from '../_gen/server-types'

type ListingQueryResolver = GQLQueryResolvers['listing']

const listing: ListingQueryResolver = async (parent, { id }, context, info) => {
	console.log(`looking for listing by id : ${id}`)

	let listing = await new ListingClient().findById(id)
	if (listing.ok) {
		return listing.value
		// let owner = await new UserClient().findById(listing.value.owner)
		// return {
		// 	...listing.value,
		// 	owner: owner.ok ? owner.value : null,
		// }
	}

	return null
}

export const resolvers = { Query: { listing } }
