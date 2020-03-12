import { GraphQLScalarType } from 'graphql'

let counters: { [key: string]: number } = {
	ID: 0,
}

function validateIdName(idName: string) {
	if (idName.length != 2 && !idName.match(/[A-Z]/)) {
		throw new Error(`id name must be 2 uppercase letters '${idName}' was provided`)
	}
}

function ensureIdRange(idName: string, id: number) {
	if (typeof counters[idName] == 'undefined' || counters[idName] < id) {
		counters[idName] = id
	}
}

export class SimpleID {
	private static readonly ERR_INVALID_ID = 'Invalid Simple ID'

	static generate = (idName: string = 'ID') => {
		validateIdName(idName)
		ensureIdRange(idName, 0)
		counters[idName] = counters[idName] + 1

		return `${idName}#${counters[idName]}`
	}

	static fromInt(id: number, idName: string = 'ID') {
		ensureIdRange(idName, id)
		return new SimpleID(`${idName}#${id}`)
	}

	constructor(private readonly id: string) {
		if (id.length < 4 && !!id.match(/^[A-Z][A-Z]#[0-9]$/)) {
			throw new Error(SimpleID.ERR_INVALID_ID)
		}

		ensureIdRange(id.substr(0, 2), parseInt(id.substr(3)))
	}

	equal(otherId: string | SimpleID | null | undefined) {
		if (otherId) {
			return this.id === otherId.toString()
		}
		return false
	}

	toString() {
		return this.id
	}

	serialize() {
		return this.id
	}
}

export const SimpleIDScalarType = new GraphQLScalarType({
	name: 'SimpleID',
	description: 'Just a small simple ID scalar type',
	serialize(value) {
		if (value instanceof SimpleID) {
			return value.serialize()
		} else {
			return new SimpleID(value).serialize()
		}
	},
	parseValue(value) {
		return new SimpleID(value)
	},
})
