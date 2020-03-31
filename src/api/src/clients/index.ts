import { ReqInfo, UserInfo } from '../schema/context'
import { LegacyAppApi } from './legacy/legacy-app'


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
			findById: (id: any) => id,
		},
	}
}

export interface DataLoaders {
	listing: {
		findById: (id: any) => { id: any }
	}
}
