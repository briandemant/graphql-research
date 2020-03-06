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

interface ResolverCall {
	path: ResponsePath
	fieldName: string
	parentType: GraphQLType
	returnType: GraphQLType
	startOffset: HighResolutionTime
	endOffset?: HighResolutionTime
}

type TimingInfo = {
	resolverCalls: ResolverCall[]
	startWallTime: Date
	endWallTime?: Date
	startHrTime: HighResolutionTime
	duration?: HighResolutionTime
}
export const TracingPlugin = {
	requestDidStart(reqCtx: GraphQLRequestContext): GraphQLRequestListener {
		console.log('requestDidStart', reqCtx)

		const tracing: TimingInfo = {
			startWallTime: new Date(),
			startHrTime: process.hrtime(),
			resolverCalls: [] as ResolverCall[],
		}
		// @ts-ignore
		reqCtx.context.trace.tracing = tracing

		return {
			executionDidStart(reqCtx) {
				return () => {
					tracing.duration = process.hrtime(tracing.startHrTime)
					tracing.endWallTime = new Date()
				}
			},

			async willSendResponse(reqCtx) {
				console.log('willSendResponse', reqCtx)
				if (reqCtx.response && reqCtx.response.extensions) {
					// here we could collect the tracing .. maybe even report it
					console.log('tracing', reqCtx.response.extensions.tracing)
					delete reqCtx.response.extensions.tracing
					console.log('mine   ', tracing)
					if (
						typeof tracing.startWallTime !== 'undefined' &&
						typeof tracing.endWallTime !== 'undefined' &&
						typeof tracing.duration !== 'undefined'
					) {
						reqCtx.response.extensions.tracing = {
							version: 1,
							startTime: tracing.startWallTime.toISOString(),
							endTime: tracing.endWallTime.toISOString(),
							duration: durationHrTimeToNanos(tracing.duration),
							execution: {
								resolvers: tracing.resolverCalls.map(resolverCall => {
									const startOffset = durationHrTimeToNanos(resolverCall.startOffset)
									const duration = resolverCall.endOffset
										? durationHrTimeToNanos(resolverCall.endOffset) - startOffset
										: 0
									return {
										// path: [...responsePathAsArray({ key: resolverCall.fieldName, prev: resolverCall.path.prev })],
										path: [...responsePathAsArray(resolverCall.path)],
										parentType: resolverCall.parentType.toString(),
										fieldName: resolverCall.fieldName,
										returnType: resolverCall.returnType.toString(),
										startOffset,
										duration,
									}
								}),
							},
						}
					}
				}
			},
		}
	},
	serverWillStart(service: GraphQLServiceContext) {
		console.log('service starting hash:', service.schemaHash)
	},
}

export const tracingMiddleware = async (
	resolve: any,
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
) => {
	// @ts-ignore
	const tracing = context.trace.tracing
	const resolverCall: ResolverCall = {
		path: info.path,
		fieldName: info.fieldName,
		parentType: info.parentType,
		returnType: info.returnType,
		startOffset: process.hrtime(tracing.startHrTime),
	}

	tracing.resolverCalls.push(resolverCall)

	try {
		let result = await resolve(parent, args, context, info)
		resolverCall.endOffset = process.hrtime(tracing.startHrTime)
		return result
	} catch (e) {
		resolverCall.endOffset = process.hrtime(tracing.startHrTime)
		throw e
	}
}
