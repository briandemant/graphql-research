import { fail, Maybe, NonEmptyString, ok, SimpleID, sleep, ValidDate } from '@demo/lib'
import * as faker from 'faker'

faker.seed(321)

export interface DataUser {
	id: SimpleID
	name?: NonEmptyString
	userName?: NonEmptyString
	createdAt: ValidDate
}

interface JsonUser {
	id: string
	name: string
	userName: string
	createdAt: Date
}

const users: JsonUser[] = []

for (let i = 0; i < 10; i++) {
	users.push({
		id: SimpleID.generate('US'),
		name: faker.name.findName(),
		userName: faker.internet.userName(),
		createdAt: faker.date.recent(7),
	})
}
// console.log(users)
const fromJsonToUser = (user: JsonUser): Maybe<Readonly<DataUser>> => {
	try {
		return ok({
			id: new SimpleID(user.id),
			name: new NonEmptyString(user.name),
			userName: new NonEmptyString(user.userName),
			createdAt: new ValidDate(user.createdAt),
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
