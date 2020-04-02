import { fail, ok, sleep,Cache } from '../'

describe('Cache', () => {
	it('should load .env.test for environment vars', async () => {
		const cache = new Cache<{ createdAt: number, id: number }>({
			maxAge: 10,
			maxStaleAge: 20,
		})

		// let count = 0
		// const something = await cache.get('first', async () => {
		// 	await sleep(10)
		// 	if (Math.random() > 2) {
		// 		return fail('qwe')
		// 	}
		//
		// 	return ok({ createdAt: Date.now(), id: ++count })
		// })

	})
})
