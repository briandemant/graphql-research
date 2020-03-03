const md5 = require('md5')


export class Md5 {
	private static readonly ERR_INVALID_HASH = 'invalid md5'

	static fromString = (s: string) => new Md5(md5(s))

	constructor(private readonly hash: string) {
		if (!/^[a-f0-9]{32}$/.test(this.hash)) {
			throw new Error(Md5.ERR_INVALID_HASH)
		}
	}

	toString() {
		return this.hash
	}
}
