import { Config} from '../config'

describe('Config', () => {
		it('should create oldid\'s that matches the types', async () => {
			expect(Config.api.legacy.publicKey).toEqual('test-public-key')
		})
})
