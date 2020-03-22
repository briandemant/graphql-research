export interface Error<E = string> {
	error: E
}
export type Maybe<T, E = string> = T | Error<E>

export const isOk = <T, E>(arg: Maybe<T, E>): arg is T => 'error' in arg
export const isError = <T, E>(arg: Maybe<T, E>): arg is Error<E> => !('error' in arg)

export const ok = <T>(value: T): T => value
export const fail = <E>(error: E): Error<E> => ({ error })

//
// export interface Ok<T> {
// 	ok: true
// 	value: T
// }
//
// export interface Error<E = string> {
// 	ok: false
// 	error: E
// }
//
// export type Maybe<T, E = string> = Ok<T> | Error<E>
//
// export const isOk = <T, E>(arg: Maybe<T, E>): arg is Ok<T> => arg.ok
// export const isError = <T, E>(arg: Maybe<T, E>): arg is Error<E> => !arg.ok
//
// export const ok = <T>(value: T): Ok<T> => ({ ok: true, value })
// export const fail = <E>(error: E): Error<E> => ({ ok: false, error })
