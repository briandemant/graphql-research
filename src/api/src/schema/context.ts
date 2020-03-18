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

export let contextFn = async ({ req, res }: ExpressContext): Promise<Context> => {
	const requestId = req.header('x-request-id') ? req.header('x-request-id')! : 'UNTRACEABLE'
	// TODO: Add to context after JWT link
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
			authenticated: false,
			roles: [],
		},
		trace: { requestId, path: [] },
	}
}
