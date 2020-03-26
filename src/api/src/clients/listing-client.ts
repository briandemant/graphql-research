import { fail, isError, isOk, Maybe, NonEmptyString, ok, SimpleID, sleep } from '@demo/lib'
import * as faker from 'faker'

faker.seed(13)

export interface DataListing {
	id: SimpleID
	title: NonEmptyString
	slug: NonEmptyString
	owner: SimpleID
}

interface JsonListing {
	id: string
	title: string
	slug: string
	owner: string
}

const listings: JsonListing[] = []

for (let u = 0; u < 10; u++) {
	let items = faker.random.number({ min: 1, max: 10 })
	let owner = SimpleID.fromInt(u, 'US').toString()
	for (let l = 0; l < items; l++) {
		const id = SimpleID.generate('LI')
		listings.push({
			id,
			owner,
			title: faker.commerce.productName(),
			slug: `/listing/${id}`,
		})
	}
}
// console.log(listings)
const fromJsonToListing = (listing: JsonListing): Maybe<Readonly<DataListing>> => {
	try {
		return ok({
			id: new SimpleID(listing.id),
			title: new NonEmptyString(listing.title),
			slug: new NonEmptyString(listing.slug),
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

	async findAll(filter: (item: Readonly<DataListing>) => boolean): Promise<Maybe<Readonly<DataListing>[]>> {
		await sleep(0.05)
		const list = listings.map(fromJsonToListing)

		const error = list.reduce((prev, i) => prev || isError(i), false)
		if (!error) {
			const mapped = list.map(l => (isOk(l) ? l : null)) as Readonly<DataListing>[]
			return ok(mapped.filter(filter))
		}

		return fail("i can't do that")
	}
}
