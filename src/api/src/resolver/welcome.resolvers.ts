import { GQLQueryResolvers } from '../_gen/server-types'

type WelcomeQueryResolver = GQLQueryResolvers['welcome']

const welcome: WelcomeQueryResolver = (parent, { name }, context, info) => {
	if (name) {
		return `hello, ${name}`
	}
	return `hello, 'stranger'`
}

export const resolvers = { Query: { welcome  } }
