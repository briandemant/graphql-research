// import db from './../data/data'

// export default {
// 	Query: {
// 		listing: async (_, { id }) => {
// 			return db.listings.find(listing => listing.id === id)
// 		},
// 		listings: () => db.listings,
// 	},

// 	Listing: {
// 		user(listing, args, context, info) {
// 			return db.users.find(user => user.id === listing.userId)
// 		},
// 		category(listing, args, context, info) {
// 			return db.categories.find(category => category.id === listing.categoryId)
// 		},
// 	},
// }
