import { isError, Version } from '@demo/lib'
import { Meter } from '@opentelemetry/metrics'
import express from 'express'
import { ListingClient, UserClient } from './../clients/'

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
}

interface ExpressContext {
	req: express.Request
	res: express.Response
}

// TODO move into express area
function getClient(clientString: string) {
	// Format GG-[agent-ident] - [version]( - [what ever info you want])
	if (clientString.startsWith('GG')) {
		const clientInfo = /GG-(\S*) - (\S*)/.exec(clientString)
		if (!clientInfo) {
			console.error('Invalid client version', clientInfo)
			throw new Error('Invalid client version')
		}
		let version = Version.parse(clientInfo[2])
		if (isError(version)) {
			console.error('Invalid client version', clientInfo, version.error)
			throw version.error
		}

		if (clientString.startsWith('GG-Android')) {
			return { type: ClientType.ANDROID, version: version }
		} else if (clientString.startsWith('GG-iOS')) {
			return { type: ClientType.IOS, version: version }
		} else {
			return { type: ClientType.WEB, version: version }
		}
	}
}

export let contextFn = async ({ req, res }: ExpressContext): Promise<Partial<Context>> => {
	let requestId = req.header('x-request-id') ? req.header('x-request-id')! : 'UNTRACEABLE'
	let something = {
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
	}
}
