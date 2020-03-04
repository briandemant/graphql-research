import { SchemaDirectiveVisitor } from 'graphql-tools'
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLField,
	GraphQLArgument,
	GraphQLInterfaceType,
	GraphQLInputObjectType,
	GraphQLInputField,
	GraphQLScalarType,
	GraphQLUnionType,
	GraphQLEnumType,
	GraphQLEnumValue,
} from 'graphql'

class SomeDirective extends SchemaDirectiveVisitor {
	visitSchema(schema: GraphQLSchema) {

	}
	visitObject(object: GraphQLObjectType) {

	}
	visitFieldDefinition(field: GraphQLField<any, any>) {

	}
	visitArgumentDefinition(argument: GraphQLArgument) {

	}
	visitInterface(iface: GraphQLInterfaceType) {

	}
	visitInputObject(object: GraphQLInputObjectType) {

	}
	visitInputFieldDefinition(field: GraphQLInputField) {

	}
	visitScalar(scalar: GraphQLScalarType) {

	}
	visitUnion(union: GraphQLUnionType) {

	}
	visitEnum(type: GraphQLEnumType) {

	}
	visitEnumValue(value: GraphQLEnumValue) {

	}
}
