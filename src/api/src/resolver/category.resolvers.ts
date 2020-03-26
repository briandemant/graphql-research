// import db from './../data/data'

// function pathTo(category) {
// 	const path = [category]
// 	let p = category
// 	while ((p = db.categories.find(x => x.id === p.parentId))) {
// 		path.push(p)
// 	}
// 	return path.reverse()
// }

// export default {
// 	Query: {
// 		category: async (_, { id }) => {
// 			return db.categories.find(category => category.id === id)
// 		},
// 		categories: () => db.categories,
// 	},

// 	Category: {
// 		parent(category, args, context, info) {
// 			return db.categories.find(x => x.id === category.parentId)
// 		},

// 		path(category, args, context, info) {
// 			return pathTo(category)
// 		},
// 		slug(category, args, context, info) {
// 			return pathTo(category)
// 				.map(x => `${x.id}-${x.title}`)
// 				.join('/')
// 		},
// 	},
// }
