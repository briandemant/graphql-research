export class ValidDate {
	private static readonly ERR_INVALID_DATE = 'Invalid Date'

	private readonly date: Date

	private static readonly tsHours = 60 * 60
	private static readonly tsMinutes = 60
	private static readonly tsSeconds = 1

	static fromRecentPast(hours: number, minutes: number = 0, seconds: number = 0) {
		const tsHours = ValidDate.tsHours * hours
		const tsMinutes = ValidDate.tsMinutes * minutes
		const tsSeconds = ValidDate.tsSeconds * seconds
		const timestamp = Math.round(new Date().getTime() / 1000)
		const yesterdayTimestamp = timestamp - (tsHours + tsMinutes + tsSeconds)

		return new ValidDate(yesterdayTimestamp * 1000)
	}

	constructor(milliUnixTimestampOrDateString?: number | string | Date) {
		let d: Date

		if (milliUnixTimestampOrDateString instanceof Date) {
			d = new Date(milliUnixTimestampOrDateString.getTime())
		} else if (
			typeof milliUnixTimestampOrDateString === 'string' ||
			typeof milliUnixTimestampOrDateString === 'number'
		) {
			d = new Date(milliUnixTimestampOrDateString as string)
		} else {
			d = new Date()
		}
		if (d.toString() === ValidDate.ERR_INVALID_DATE) {
			throw new Error(ValidDate.ERR_INVALID_DATE)
		}
		this.date = d
	}

	isLargerThan(date: ValidDate) {
		return this.date.getTime() > date.getTime()
	}

	getTime(): number {
		return this.date.getTime()
	}

	toISOString() {
		return this.date.toISOString()
	}

	toString() {
		return this.date.toString()
	}

	toDate(): Date {
		return new Date(this.date.getTime())
	}
}
