import { fail, isError, isOk, Maybe, ok } from '../../'

describe('Maybe', () => {
	it('should ..', async () => {
		const fn = (succeed: boolean): Maybe<number> => {
			if (succeed) {
				return ok(1)
			} else {
				return fail('you loose')
			}
		}
		const failed = fn(false)
		const succeed = fn(true)

		expect(succeed).toEqual(1)

		expect(isError(failed)).toBeTruthy()
		expect(isError(succeed)).toBeFalsy()
	})

	it('should have isOk', async () => {
		const fn = (succeed: boolean): Maybe<number> => {
			if (succeed) {
				return ok(1)
			} else {
				return fail('you loose')
			}
		}
		const failed = fn(false)
		const succeed = fn(true)

		expect(succeed).toEqual(1)
		expect(failed).not.toEqual(1)
		console.log("isOk(failed)",isOk(failed))
		console.log("isOk(succeed)",isOk(succeed))

		// expect(isOk(failed)).toBeTruthy()
		// expect(isOk(succeed)).toBeFalsy()
		// expect(false).toBeFalsy()
		// expect(true).toBeFalsy()
	})
})
