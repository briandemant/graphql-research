import { Config } from '../config'

describe('Config', () => {
	it('should load .env.test for environment vars', async () => {
		expect(Config.api.legacy.publicKey).toEqual('test-public-key')
	})

	it('should replace www to api for domains', async () => {
		expect(Config.api.legacy.baseUrl).toEqual('https://api.test.gg-test.dk')
	})
})
