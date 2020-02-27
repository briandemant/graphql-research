import { v4 } from 'uuid'
const isUUID = require('is-uuid')

export class UuidV4 {
	private static readonly ERR_INVALID_UUID = 'invalid uuid'

	static generate = () => new UuidV4(v4())
	static validate: (uuid: string) => boolean = (uuid: string) => isUUID.v4.validate(uuid)

	constructor(private uuid: string) {
		if (!UuidV4.validate(this.uuid)) {
			throw new Error(UuidV4.ERR_INVALID_UUID)
		}
	}

	public toString() {
		return this.uuid
	}
}
