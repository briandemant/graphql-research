import { isParseError } from '@demo/lib'
import { UserInputError } from 'apollo-server'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../schema/context'

export const scalarMiddleware = async (
	resolve: any,
	parent: any,
	args: { [key: string]: any },
	context: Context,
	info: GraphQLResolveInfo
) => {
	const errors: { name: string; value: any; error: any }[] = []
	Object.keys(args).forEach(k => {
		const arg = args[k]
		if (isParseError(arg)) {
			errors.push({ name: k, value: arg.value, error: arg.error })
		} else {
			// try {
			// 	console.log('arg', arg)
			// 	console.log('...', arg.toOldId())
			// } catch (e) {
			//
			// }
		}
	})

	if (errors.length === 0) {
		return await resolve(parent, args, context, info)
	} else {
		// throw errors
		throw new UserInputError(errors[0].error, {
			invalidArgs: errors,
		})
	}
}
