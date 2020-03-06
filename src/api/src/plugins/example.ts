import { GraphQLServiceContext, GraphQLRequestContext, GraphQLRequestListener } from 'apollo-server-plugin-base'

export const ExamplePlugin = {
	requestDidStart(reqCtx: GraphQLRequestContext): GraphQLRequestListener {
		console.log('requestDidStart', reqCtx)
		return {
			parsingDidStart(reqCtx) {
				console.log('parsingDidStart', reqCtx)
				return error => error && console.error('parsingDidStart', error)
			},
			validationDidStart(reqCtx) {
				console.log('validationDidStart', reqCtx)
				return error => error && console.error('validationDidStart', error)
			},
			async didEncounterErrors(reqCtx) {
				console.log('didEncounterErrors', reqCtx)
			},
			async didResolveOperation(reqCtx) {
				console.log('didResolveOperation', reqCtx)
			},
			async responseForOperation(reqCtx) {
				console.log('responseForOperation', reqCtx)
				return null
			},
			executionDidStart(reqCtx) {
				console.log('executionDidStart', reqCtx)
				return error => error && console.error('executionDidStart', error)
			},
			async willSendResponse(reqCtx) {
				console.log('willSendResponse', reqCtx)
			},
		}
	},
	serverWillStart(service: GraphQLServiceContext) {
		console.log('service starting hash:', service.schemaHash)
	},
}
