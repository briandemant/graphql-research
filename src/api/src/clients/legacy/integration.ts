import { Config } from '@demo/lib'
import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import { UserInfo } from '../../schema/context'


const tokens: { [id: string]: string } = {}

export async function getAppUserToken(userInfo: UserInfo) {
	const id = userInfo.userId

	if (id) {
		if (typeof tokens[id] !== 'string') {
			const params = new URLSearchParams()
			params.append('public_key', Config.api.legacy.publicKey)
			params.append('jwt', userInfo.jwt)

			const res = await fetch(Config.api.legacy.baseIntegrationUrl + 'auth/legacy_app_api_token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': Config.api.legacy.basicAuthCredentials,
				},
				body: params,
			})
			const raw = await res.json()
			tokens[id] = raw.data.token
		}
		return tokens[id]
	}
}

export function setAppUserToken(userInfo: UserInfo, token: string) {
	const id = userInfo.userId
	if (id && token) {
		tokens[id] = token
	}
}
