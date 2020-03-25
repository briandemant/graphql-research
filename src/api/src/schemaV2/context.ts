import express from 'express'

export interface Context {
	auth: {
		authenticated: boolean
		roles: string[]
		userId?: string
		sessionId?: string
	}
	trace: {
		requestId: string
		spanId?: string
		path: string[]
	}
}

interface ExpressContext {
	req: express.Request
	res: express.Response
}

export const contextFn = async ({ req, res }: ExpressContext): Promise<Context> => {
	const requestId = req.header('x-request-id') ? req.header('x-request-id')! : 'UNTRACEABLE'
	const context = {
		danger: {
			'gg-user-segment': req.header('gg-user-segment'),
			'gg-user-type': req.header('gg-user-type'),
			'gg-erotic': req.header('gg-erotic'),
		},
		user: {
			'gg-cookies': req.header('gg-cookies'),
		},
	}
	return {
		auth: {
			// TODO: validate token from `req.headers.authorization`
			authenticated: !!req.header('gg-user-type') && req.header('gg-user-type') !== 'anon',
			// TODO: extract the roles from headers
			roles: [],
		},
		trace: { requestId, path: [] },
	}
}
