import { Config, fail, ok, OldIdTypes, UuidV4 } from '@demo/lib'
import * as LRU from 'lru-cache'
import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import { ReqInfo, UserInfo } from '../../schema/context'
import { getAppUserToken, setAppUserToken } from './integration'

type AuthOptions = { userInfo: UserInfo, reqInfo: ReqInfo }

const categoryCache = new LRU({ maxAge: 1000 * 10 })

interface SubCategory {
	id: UuidV4,
	title: string,
	results: number
}

interface Category {
	id: UuidV4,
	title: string,
	results: number
	children: SubCategory[]
}

async function get(path: string, options: AuthOptions & { params?: { [key: string]: string } }) {
	const token = await getAppUserToken(options.userInfo)
	const urlParams = new URLSearchParams()
	urlParams.append('token', token!)
	urlParams.append('device', 'gg-integration')
	console.log('options.params', options.params)
	if (options.params) {

		for (let key of Object.keys(options.params)) {
			console.log('key', key)
			urlParams.append(key, options.params[key])
		}
	}

	let url = `${Config.api.legacy.baseAppApiUrl}${path}?${urlParams.toString()}`
	console.log('Legacy.get', url)

	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': Config.api.legacy.basicAuthCredentials,
		},
	})
	let result = await res.json()
	if (result.token) {
		setAppUserToken(options.userInfo, result.token)
	}
	return result
}

export class LegacyAppApi {
	constructor(private auth: AuthOptions) {
	}

	async getMyInfo() {
		let raw: {
			success: boolean,
			uid: number,
			// user_nem_id_validate: boolean,
			// email: string,
			// name: string,
			username: string,
			// address: string,
			// country: string,
			// countryCode: string,
			// postalCode: string,
			// city: string,
			// phone: string,
			// phoneCountryCode: string,
			// cell: string,
			// phone2CountryCode: string,
			// phone2: string,
			// cell2: string,
			// sex: string,
			// birthyear: number,
			// image: string,
			// is_business: boolean
		} = await get('user/user_info', this.auth)
		// console.log(raw)

		if (raw.success) {
			return ok({
				id: UuidV4.fromOldId(OldIdTypes.User, raw.uid),
				username: raw.username,
			})
		}

		return fail(raw)
	}

	async getCategory(id: UuidV4) {
		if (categoryCache.has(id.toString())) {
			console.log(`cache : category-${id.toString()}`)
			return ok<Category>(categoryCache.get(id.toString()) as Category)
		} else {
			let raw: {
				success: boolean,
				name: string,
				results: number,
				children: [{ id: number, name: string, results: number, }]
				can_create: boolean,
				payment_category: boolean,
				// payment_category_info_text: string,
				category_fields:
					[{
						field_id: number,
						name: string,
						type: string,
						datatype: string,
						is_required: boolean,
						default_value:
							string,
						unknown_enable: string
					}],
				facets: {
					[idx: string]: {
						type: 'checkbox',
						name: 'region',
						title?: string,
						rows: any,
						weight: number
					}
				}

				GAScreenValue: string,
			} = await get('category/data', { params: { id: id.toOldId().id.toString() }, ...this.auth })

			if (raw.success) {
				let category = {
					id: id,
					title: raw.name,
					results: raw.results,
					children: raw.children.map((x) => ({
						id: UuidV4.fromOldId(OldIdTypes.Category, x.id),
						title: x.name,
						results: x.results,
					})),
				}
				categoryCache.set(id.toString(), category)
				return ok<Category>(category)
			}
			return fail(raw)
		}
	}

	async getCategoryRoots() {
		if (categoryCache.has('category-roots')) {
			console.log('cache : category-roots')

			return ok<SubCategory[]>(categoryCache.get('category-roots') as SubCategory[])
		} else {
			let raw: {
				success: boolean,
				children: [{ id: number, name: string, results: number, }]
			} = await get('category/root', this.auth)
			// console.log(raw)

			if (raw.success) {
				const roots = raw.children.map((x) => ({
					id: UuidV4.fromOldId(OldIdTypes.Category, x.id),
				}))
				categoryCache.set('category-roots', roots, 1000 * 60 * 60 * 24) // 24 hours .. almost never changes

				return ok<SubCategory[]>(roots)
			}

			return fail(raw)
		}
	}

	// static async getDataloader(user: UserInfo, req: ReqInfo): Promise<DataLoader<UuidV4, any>> {
	// 	return new DataLoader<UuidV4, any>(async (ids) => {
	// 		return ['qwe']
	// 	})
	// }
}
