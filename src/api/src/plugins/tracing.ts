import { GraphQLRequestContext, GraphQLRequestListener, GraphQLServiceContext } from 'apollo-server-plugin-base'
import { GraphQLResolveInfo, GraphQLType, ResponsePath, responsePathAsArray } from 'graphql'
import { Context } from '../schema/context'
/*
https://github.com/apollographql/apollo-server/tree/master/packages/apollo-engine-reporting

 */
type HighResolutionTime = [number, number]

function durationHrTimeToNanos(hrtime: HighResolutionTime) {
	return hrtime[0] * 1e9 + hrtime[1]
}

export interface TracingFormat {
	version: 1
	startTime: string
	endTime: string
	duration: number
	execution: {
		resolvers: {
			path: (string | number)[]
			parentType: string
			fieldName: string
			returnType: string
			startOffset: number
			duration: number
		}[]
	}
}

let schemaHash: string = 'INVALID'
export const TracingPlugin = {
	requestDidStart(reqCtx: GraphQLRequestContext): GraphQLRequestListener {
		console.log('requestDidStart', reqCtx)

		return {
			async willSendResponse(reqCtx) {
				console.log('willSendResponse', reqCtx)
				if (reqCtx.response && reqCtx.response.extensions) {
					let tracing: TracingFormat = reqCtx.response.extensions.tracing
					console.log('tracing', tracing)
					// we have access to the tracing data
					// which can be used to log:
					//  * slow resolvers
					//  * resolvers in use (by which client)
					//  * ???
				}
			},
		}
	},
	serverWillStart(service: GraphQLServiceContext) {
		console.log('service starting hash:', service.schemaHash)
		// saved so we can see when a schema change was activated
		schemaHash = service.schemaHash
	},
}

export const tracingMiddleware = async (
	resolve: any,
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
) => {
	// just a noop for now
	let result = await resolve(parent, args, context, info)

	return result
}
