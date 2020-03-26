import { ignoreFail, isError, UuidV4, Version } from '@demo/lib'
import { ValidationError } from 'apollo-server'
import express from 'express'
import * as jwt from 'jsonwebtoken'
import { DataLoaders, getDataLoaders } from './../clients/'

enum ClientType {
	ANDROID = 'android',
	IOS = 'ios',
	WEB = 'web',
	AGENT = 'agent',
}

enum LoginMethod {
	Email = 'email',
}

export type AuthInfo = {
	authenticated: boolean
	userSession: string
	userId: string | undefined
	roles: UserRoles[]
	showErotic: boolean
	segment: string
	// rememberMe: boolean,
	// loginMethod: LoginMethod,
	// ip: '193.163.97.225',
	// userAgent:
	// 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) GraphQLPlayground/1.8.10 Chrome/61.0.3163.100 Electron/2.0.11 Safari/537.36',
	// iat: 1585120343
}

export interface Context {
	sources: DataLoaders
	request: ReqInfo
	client: {
		type: ClientType
		version: Version
	}
	user: AuthInfo
}

interface ExpressContext {
	req: express.Request
	res: express.Response
}

export type ReqInfo = {
	requestId: string
	useragent: string
	debug: boolean
}

const UNKNOWN_VERSION = ignoreFail(Version.parse('0.0.0-NO-VERSION'), 'fake unknown version')

// TODO move into express area
const getAgent = async (clientAgent: string, reqInfo: ReqInfo) => {
	// Format GG-[agent-ident] - [version]( - [what ever info you want])
	if (clientAgent.startsWith('GG')) {
		const clientInfo = /GG-(\S*) - (\S*)/.exec(clientAgent)
		if (!clientInfo) {
			console.error('Invalid client version', clientInfo)
			throw new Error('Invalid client version')
		}

		const version = Version.parse(clientInfo[2])

		if (isError(version)) {
			console.error('Invalid client version', clientInfo, version.error)
			throw version.error
		}

		if (clientAgent.startsWith('GG-Android')) {
			return { type: ClientType.ANDROID, version: version }
		} else if (clientAgent.startsWith('GG-iOS')) {
			return { type: ClientType.IOS, version: version }
		} else {
			return { type: ClientType.AGENT, version: version }
		}
	}

	return { type: ClientType.WEB, version: UNKNOWN_VERSION }
}

const jwtSecret = 'default JWT secret'

const getUserInfo = async (req: express.Request): Promise<AuthInfo> => {
	// console.log('req.headers',req.headers)
	type VerifiedInfo = {
		userSession: string
		userId?: string
		userRoles: string[]
		rememberMe: boolean
		loginMethod: string
		ip: string
		userAgent: string
		iat: number
	}

	let result: Partial<AuthInfo> = {}

	let verified: VerifiedInfo | false = false

	if (req.headers.authorization) {
		verified = jwt.verify(req.headers.authorization, jwtSecret) as VerifiedInfo
	}

	result.showErotic = req.header('gg-erotic') === 'true'
	result.segment = req.header('gg-user-segment') ? req.header('gg-user-segment')! : 'x'
	if (verified) {
		result.userSession = verified.userSession
		result.userId = UuidV4.parse(verified.userId).toString()
		result.authenticated = typeof result.userId !== 'undefined' && UuidV4.validate(result.userId)
		result.roles = [...verified.userRoles] as UserRoles[]
	} else {
		result.userSession = UuidV4.generate().toString()
		result.authenticated = false
		result.roles = []
	}

	if (process.env.NODE_ENV == 'dev') {
		if (req.header('dev-userId')) {
			result.userId = ignoreFail(UuidV4.parse(req.header('dev-userId')), `dev-userId`).toString()
			result.segment = result.userId?.substr(0, 1)
		}

		if (req.header('dev-roles')) {
			result.roles = req.header('dev-roles')!.split(',') as UserRoles[]
		}

		if (req.header('dev-erotic')) {
			result.showErotic = req.header('dev-erotic') !== 'true'
		}
	}

	return result as AuthInfo
}

export enum UserRoles {
	USER = 'user',
	ADMIN = 'admin',
}

export let contextFn = async ({ req, res }: ExpressContext): Promise<Context> => {
	try {
		const requestId = req.header('x-request-id') ? req.header('x-request-id')! : 'UNTRACEABLE'
		const clientAgent = `${req.header('x-client-version')}`
		const userInfo = await getUserInfo(req)

		let reqInfo = {
			requestId,
			useragent: `${req.header('useragent')}`,
			debug: req.header('dev-debug') === 'true',
		}

		let result: Context = {
			user: userInfo,
			client: await getAgent(clientAgent, reqInfo),
			request: reqInfo,
			sources: await getDataLoaders(userInfo, reqInfo),
		}
		if (reqInfo.debug) {
			console.log(result)
		}
		return result
	} catch (e) {
		throw new ValidationError(e.message)
	}
}
