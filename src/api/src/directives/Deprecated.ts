import { SchemaDirectiveVisitor } from 'apollo-server'
import { GraphQLEnumValue, GraphQLField } from 'graphql'

export class DeprecatedDirective extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: GraphQLField<any, any>) {
		field.isDeprecated = true
		field.deprecationReason = this.args.reason
	}

	public visitEnumValue(value: GraphQLEnumValue) {
		value.isDeprecated = true
		value.deprecationReason = this.args.reason
	}
}
