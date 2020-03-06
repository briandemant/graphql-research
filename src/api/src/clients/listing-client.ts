import { NonEmptyString, SimpleID, sleep } from '@demo/lib'

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

const listings: JsonListing[] = [
	{ id: SimpleID.fromInt(3).toString(), owner: SimpleID.fromInt(1).toString(), title: 'Shoe' },
	{ id: SimpleID.fromInt(4).toString(), owner: SimpleID.fromInt(1).toString(), title: 'Lego' },
	{ id: SimpleID.fromInt(5).toString(), owner: SimpleID.fromInt(2).toString(), title: 'Guitar' },
]

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
			let mapped = list.map(l => (l.ok ? l.value : null)) as Readonly<DataListing>[]
			// console.log('mapped', mapped)
			// console.log('filter', mapped.filter(filter))
			return ok(mapped.filter(filter))
		}

		return fail("i can't do that")
	}
}
