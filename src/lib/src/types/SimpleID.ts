let counter = 0

export class SimpleID {
	private static readonly ERR_INVALID_ID = 'invalid Simple ID'

	static generate = () => `ID#${++counter}`
	static validate: (id: string) => boolean = (id: string) => !!id.match(/^ID#[0-9]$/)

	constructor(private id: string) {
		if (!SimpleID.validate(this.id)) {
			throw new Error(SimpleID.ERR_INVALID_ID)
		}
	}

	public toString() {
		return this.id
	}
}
