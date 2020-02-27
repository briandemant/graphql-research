import { GQLUser } from './_gen/server-types'

const user: GQLUser = {
	id: '1',
	name: 'John',
	createdAt: new Date(),
	listings: [],
}

user.listings.push({
	id: '1-1',
	title: 'buy me',
	owner: user,
})

console.log(user.name)
