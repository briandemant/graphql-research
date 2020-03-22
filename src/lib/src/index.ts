export * from './types/Md5'
export * from './types/NonEmptyString'
export * from './types/UuidV4'
export * from './types/ValidDate'
export * from './types/SimpleID'
export * from './types/Version'
export * from './types/Maybe'

export const sleep = async (sec: number) =>
	new Promise(res => {
		setTimeout(res, sec * 1000)
	})

export const sleepRandom = async (sec: number, noise: number) =>
	new Promise(res => {
		setTimeout(res, sec * 1000 - noise + Math.random() * 2 * noise)
	})
