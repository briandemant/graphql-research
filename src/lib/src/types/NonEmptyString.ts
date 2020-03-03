export class NonEmptyString {
	private static readonly ERR_EMPTY_STRING = 'empty string'

	private readonly s: string

	constructor(s: string) {
		const trimmed = s.trim()
		if (trimmed.length < 1) {
			throw new Error(NonEmptyString.ERR_EMPTY_STRING)
		}

		this.s = trimmed
	}

	toString() {
		return this.s
	}
}
