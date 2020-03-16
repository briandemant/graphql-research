import { NonEmptyString, SimpleID, sleep } from '@demo/lib'
import * as faker from 'faker'

faker.seed(13)

export interface DataListing {
	id: SimpleID
	title: NonEmptyString
	owner: SimpleID
}

interface JsonListing {
	id: string
	title: string
	owner: string
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

const listings: JsonListing[] = []

for (let u = 0; u < 10; u++) {
	let items = faker.random.number({ min: 1, max: 10 })
	let owner = SimpleID.fromInt(u, 'US').toString()
	for (let l = 0; l < items; l++) {
		listings.push({
			id: SimpleID.generate('LI'),
			owner,
			title: faker.commerce.productName(),
		})
	}
}
// console.log(listings)
const fromJsonToListing = (listing: JsonListing): Result<Readonly<DataListing>> => {
	try {
		return ok({
			id: new SimpleID(listing.id),
			title: new NonEmptyString(listing.title),
			owner: new SimpleID(listing.owner),
		} as Readonly<DataListing>)
	} catch (e) {
		return fail(e.message)
	}
}

export class ListingClient {
	async findById(id: SimpleID) {
		await sleep(0.05)
		return fromJsonToListing(listings.filter(u => u.id == id.toString())[0])
	}

	async findAll(filter: (item: Readonly<DataListing>) => boolean): Promise<Result<Readonly<DataListing>[]>> {
		await sleep(0.05)
		const list = listings.map(fromJsonToListing)
		// console.log('list', list)

		const error = list.reduce((prev, i) => prev || !i.ok, false)
		if (!error) {
			const mapped = list.map(l => (l.ok ? l.value : null)) as Readonly<DataListing>[]
			// console.log('mapped', mapped)
			// console.log('filter', mapped.filter(filter))
			return ok(mapped.filter(filter))
		}

		return fail("i can't do that")
	}
}
