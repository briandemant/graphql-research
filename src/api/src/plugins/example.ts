import { GraphQLRequestContext, GraphQLRequestListener, GraphQLServiceContext } from 'apollo-server-plugin-base'
import * as colors from 'colors'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../schema/context'

export const ExamplePlugin = {
	requestDidStart(reqCtx: GraphQLRequestContext): GraphQLRequestListener {
		// console.log('requestDidStart', reqCtx)
		console.log(colors.magenta('requestDidStart'))
		// console.log(reqCtx.queryHash) // << undefined
		console.log(colors.magenta('context'), reqCtx.context)
		console.log(colors.magenta('request'), reqCtx.request)
		console.log(colors.magenta('response'), reqCtx.response)
		console.log(colors.magenta('cache'), reqCtx.cache)
		console.log(colors.magenta('debug'), reqCtx.debug)
		console.log(colors.magenta('metrics'), reqCtx.metrics)
		console.log(colors.magenta('keys'), Object.keys(reqCtx))
		return {
			parsingDidStart(reqCtx) {
				// NOTE: skipped when query has been sent before
				// console.log(reqCtx)
				console.log(colors.cyan('1  parsingDidStart 1'), reqCtx.queryHash)

				return error => {
					console.log(colors.cyan('2  parsingDidStart 2'))
					// console.log(reqCtx)
					return error && console.error('parsingDidStart', error)
				}
			},
			validationDidStart(reqCtx) {
				// NOTE: skipped when query has been sent before
				console.log(colors.blue('3  validationDidStart 1'))
				// console.log(reqCtx)
				return error => {
					// parser errors
					console.log(colors.blue('4  validationDidStart 2'))
					// console.log(reqCtx)
					return error && console.error('validationDidStart', error)
				}
			},
			async didEncounterErrors(reqCtx) {
				// resolver errors
				console.log(colors.red('5  didEncounterErrors'), reqCtx.queryHash)
				// console.log(reqCtx)
			},
			async didResolveOperation(reqCtx) {
				console.log(colors.green('5  didResolveOperation'), reqCtx.queryHash)
				// console.log(reqCtx.queryHash)
			},
			async responseForOperation(reqCtx) {
				console.log(colors.grey('6  responseForOperation'))
				// console.log(reqCtx)
				return null
			},
			executionDidStart(reqCtx) {
				console.log(colors.yellow('7  executionDidStart 1'))
				// console.log(reqCtx)
				return error => {
					console.log(colors.yellow('9  executionDidStart 2'))
					// console.log(reqCtx)
					return error && console.error('executionDidStart', error)
				}
			},
			async willSendResponse(reqCtx) {
				console.log(colors.magenta('10  willSendResponse'))
				// console.log(reqCtx)
			},
		}
	},
	serverWillStart(service: GraphQLServiceContext) {
		console.log('service starting hash:', service.schemaHash)
	},
}

export const exampleMiddleware = async (
	resolve: any,
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
) => {
	console.log(colors.yellow('8  willResolve 1'))
	// console.log('					parent', parent)
	// console.log('					args', args)
	// console.log('					context', context)
	// console.log('					info', info)
	let result = await resolve(parent, args, context, info)
	console.log(colors.yellow('8  willResolve 2'))
	return result
}
