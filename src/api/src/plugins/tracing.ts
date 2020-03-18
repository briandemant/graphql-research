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
		// console.log('requestDidStart', reqCtx)

		return {
			async willSendResponse(reqCtx) {
				// console.log('willSendResponse', reqCtx)
				if (reqCtx.response && reqCtx.response.extensions) {
					let tracing: TracingFormat = reqCtx.response.extensions.tracing
					// console.log('tracing', tracing)

					if (process.env['NODE_ENV'] !== 'dev') {
						delete reqCtx.response.extensions.tracing
						// emit to metrics queue to be processed for
						//  * slow resolvers
						//  * resolvers in use (by which client)
						//  * ???
					}
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
