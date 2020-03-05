import express from 'express'

export interface Context {
	auth: {
		authenticated: boolean
		roles: string[]
		userId?: string
		sessionId?: string
	}
	trace: {
		'x-request-id': string
	}
}

interface ExpressContext {
	req: express.Request
	res: express.Response
}

export let contextFn = async ({ req, res }: ExpressContext): Promise<Context> => {
	let requestId = req.header('x-request-id') ? req.header('x-request-id')! : 'UNTRACEABLE'
	let context = {
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
		trace: {
			'x-request-id': requestId,
		},
	}
}
