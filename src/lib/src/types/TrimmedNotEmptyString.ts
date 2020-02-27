export class TrimmedNotEmptyString {
	private static readonly ERR_EMPTY_STRING = 'empty string'

	private readonly s: string

	constructor(s: string) {
		const trimmed = s.trim()
		if (trimmed.length < 1) {
			throw new Error(TrimmedNotEmptyString.ERR_EMPTY_STRING)
		}

		this.s = trimmed
	}

	toString() {
		return this.s
	}
}
