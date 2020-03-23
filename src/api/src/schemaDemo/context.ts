import { isError, Version } from '@demo/lib'
import { Meter } from '@opentelemetry/metrics'
import express from 'express'
import { ListingClient } from './../clients/'
import { UserClient } from './../clients/'
enum ClientType {
	ANDROID,
	IOS,
	WEB,
	OTHER,
}

export interface Context {
	sources: {
		user: UserClient
		listing: ListingClient
	}
	client: {
		type: ClientType
		version: Version
	}
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
	meter: Meter
}

interface ExpressContext {
	req: express.Request
	res: express.Response
}

// TODO move into express area
function getClient(useragent: string) {
	if (useragent.startsWith('GG')) {
		let version = Version.parse('1.0.0')
		if (isError(version)) {
			throw version.error
		}

		if (useragent.startsWith('GG-Android')) {
			return { type: ClientType.ANDROID, version: version }
		} else if (useragent.startsWith('GG-iOS')) {
			return { type: ClientType.IOS, version: version }
		} else {
			return { type: ClientType.WEB, version: version }
		}
	}
}

export let contextFn = async ({ req, res }: ExpressContext): Promise<Partial<Context>> => {
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

	const useragent = `${req.header('x-client')}`
	const userClient = new UserClient()
	const listingClient = new ListingClient()

	return {
		sources: { user: userClient, listing: listingClient },
		client: getClient(useragent),
		auth: {
			authenticated: false,
			roles: [],
		},
		trace: { requestId, path: [] },
	}
}
