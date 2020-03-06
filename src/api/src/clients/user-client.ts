import { UuidV4, NonEmptyString, SimpleID, sleep } from '@demo/lib'

export interface DataUser {
	id: SimpleID
	name: NonEmptyString
}

interface JsonUser {
	id: string
	name: string
}

interface ResultOk<T> {
	ok: true
	value: T
}
interface ResultError<E = string> {
	ok: false
	error: E
}
type Result<T, E = string> = ResultOk<T> | ResultError<E>

function ok<T>(value: T): ResultOk<T> {
	return { ok: true, value }
}
function fail<E>(error: E): ResultError<E> {
	return { ok: false, error }
}

const users: JsonUser[] = [
	{ id: SimpleID.fromInt(1).toString(), name: 'John' },
	{ id: SimpleID.fromInt(2).toString(), name: 'Ringo' },
]

const fromJsonToUser = (user: JsonUser): Result<Readonly<DataUser>> => {
	try {
		return ok({
			id: new SimpleID(user.id),
			name: new NonEmptyString(user.name),
		} as Readonly<DataUser>)
	} catch (e) {
		return fail(e.message)
	}
}

export class UserClient {
	async findById(id: SimpleID) {
		await sleep(0.02)
		return fromJsonToUser(users.filter(u => u.id == id.toString())[0])
	}


	async findAll(query: any) {
		await sleep(0.02)
		return users.map(fromJsonToUser)
	}
}
