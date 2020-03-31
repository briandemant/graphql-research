import { ReqInfo, UserInfo } from '../schema/context'
import { LegacyAppApi } from './legacy/legacy-app'
import { GQLListing } from '../_gen/server-types'
import { UuidV4 } from '@demo/lib'

// export const getDataLoaders = async (userInfo: UserInfo, reqInfo: ReqInfo): Promise<DataLoaders> => {
// 	const app = new LegacyAppApi({ userInfo, reqInfo })
// 	if (reqInfo.debug) {
// 		const roots = await app.getCategoryRoots()
// 		// @ts-ignore
// 		const result = await app.getCategory(roots[1].id)
// 		console.log('result', result)
// 	}
//
// 	return {}
// }

export const getDataLoaders = async (userInfo: UserInfo, reqInfo: ReqInfo): Promise<DataLoaders> => {
	return {
		listing: {
			findById: async (id: UuidV4) => {
				return { id }
			},
		},
	}
}

export interface DataLoaders {
	listing: {
		findById: (id: UuidV4) => Promise<Partial<GQLListing>>
	}
}
