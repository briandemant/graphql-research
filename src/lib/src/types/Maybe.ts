export class MaybeError<E = string> {
	constructor(public readonly error: E) {}
}

export class ParseError<E, V = any> extends MaybeError<E> {
	constructor(public readonly error: E, public readonly value: V) {
		super(error)
	}
}

export type Maybe<T, E = string> = T | MaybeError<E>

export const isOk = <T, E>(value: Maybe<T, E>): value is T => isError(value)
export const isError = <T, E>(value: Maybe<T, E>): value is MaybeError<E> =>
	value instanceof MaybeError || value instanceof ParseError
export const isParseError = <T, E, V>(value: Maybe<T, E>): value is ParseError<E, V> => value instanceof ParseError

export const ok = <T>(value: T): T => value

enum EMPTY {
	'NO_VALUE',
}

export const fail = <E, V>(error: E, value: V | EMPTY = EMPTY.NO_VALUE): MaybeError<E> => {
	if (value == EMPTY.NO_VALUE) {
		return new MaybeError(error)
	} else {
		return new ParseError(error, value)
	}
}

export const ignoreFail = <T>(arg: Maybe<T>, message: string): T => {
	if (isError(arg)) {
		let error = arg.error
		if (isParseError(arg)) {
			console.error('Unexpected Error:', { error: error, message, value: arg.value })
			throw new Error('Unexpected Error:' + JSON.stringify({ error: error, message, value: arg.value }))
		}

		console.error('Unexpected Error:', { error: arg.error, message })
		throw new Error('Unexpected Error:' + JSON.stringify({ error: arg.error, message }))
	}
	return arg
}
