import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../schema/context'
import * as colors from 'colors/safe'
let counter = 0

function log(id: string, label: string, msg:  string) {
	console.log(`\n\n${colors.gray(`${id} ${label}:`)}`,msg)
}

export const debugMiddleware = async (
	resolve: any,
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
) => {
	const showDebug = process.env.NODE_ENV == 'DEV'
	let result
	if (showDebug) {
		const id = `${context.trace.spanId ? context.trace.spanId : context.trace.requestId}/${++counter}`
		const subTrace = {
			requestId: context.trace.requestId,
			spanId: id,
			path: [...context.trace.path, id],
		}

		// console.log(`${id} -`)
		const alias = info.path.key != info.fieldName ? ` as ${info.path.key}` : ''
		if (!info.path.prev) {
			const label = "start"
			log(id, label,`${info.parentType}.${info.fieldName}${alias}`)
		} else {
			console.log(`${id} resolver: ${info.parentType}.${info.fieldName}${alias}`)
		}
		// console.log(`${id} path`, info.path)
		// console.log(`${id} tpath`, subTrace.path.join('/'))
		// console.log(`${id} parent`, parent)
		// console.log(`${id} args`, args)
		// console.log(`${id} trace`, context.trace)
		// console.log(`${id} info`, info)
		result = await resolve(parent, args, { ...context, trace: subTrace }, info)
	} else {
		result = await resolve(parent, args, context, info)
	}

	if (showDebug) {
		console.log(`${context.trace.spanId} Result:`, result)
	}

	return result
}
