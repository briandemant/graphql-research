import { AuthInfo, ReqInfo } from '../schema/context'

/*
export const getDataLoaders = async (authInfo: AuthInfo, reqInfo: ReqInfo): Promise<DataLoaders> => {
	return {}
}

export type DataLoaders = {}
*/

export const getDataLoaders = async (authInfo: AuthInfo, reqInfo: ReqInfo): Promise<DataLoaders> => {
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
