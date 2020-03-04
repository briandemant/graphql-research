import { GraphQLScalarType } from 'graphql'
import { UuidV4 } from './UuidV4'

let counter = 0

export class SimpleID {
	private static readonly ERR_INVALID_ID = 'invalid Simple ID'

	static generate = () => `ID#${++counter}`
	static validate: (id: string) => boolean = (id: string) => !!id.match(/^ID#[0-9]$/)

	constructor(private id: string) {
		if (!SimpleID.validate(this.id)) {
			throw new Error(SimpleID.ERR_INVALID_ID)
		}
	}

	public toString() {
		return this.id
	}


	public match() {
		return this.id
	}

	public static fromInt(id: number) {
		if (counter < id) {
			counter = id
		}
		return new SimpleID(`ID#${id}`)
	}
}

export const SimpleIDScalarType = new GraphQLScalarType({
	name: 'SimpleID',
	description: 'Just a small simple ID scalar type',
	serialize(value) {
		console.log('serialize', value)
		if (SimpleID.validate(value)) {
			return value.toString()
		}
	},
	parseValue(value) {
		console.log('parseValue', value)
		// try {
			return new SimpleID(value)
		// } catch (e) {
		// 	return null
		// }
	},
})
