import { SchemaDirectiveVisitor } from 'apollo-server'
import { GraphQLField, GraphQLObjectType, defaultFieldResolver } from 'graphql'

// Copy pasta from the apollo-server docs, typed
// with custom logic resolving when a
export class AuthDirective extends SchemaDirectiveVisitor {
	visitObject(type: GraphQLObjectType) {
		this.ensureFieldsWrapped(type)
		// @ts-ignore
		type._requiredAuthRole = this.args.requires
	}
	// Visitor methods for nested types like fields and arguments
	// also receive a details object that provides information about
	// the parent and grandparent types.
	visitFieldDefinition(field: GraphQLField<any, any>, details: any) {
		this.ensureFieldsWrapped(details.objectType)
		// @ts-ignore
		field._requiredAuthRole = this.args.requires
	}

	// Wrap object and nested fields
	ensureFieldsWrapped(objectType: GraphQLObjectType) {
		// Mark the GraphQLObjectType object to avoid re-wrapping:
		// @ts-ignore
		if (objectType._authFieldsWrapped) {
			return
		}

		// @ts-ignore
		objectType._authFieldsWrapped = true

		const fields = objectType.getFields()

		Object.keys(fields).forEach(fieldName => {
			const field = fields[fieldName]
			const { resolve = defaultFieldResolver } = field
			field.resolve = async function(...args) {
				// Get the required Role from the field first, falling back
				// to the objectType if no Role is required by the field:
				// @ts-ignore
				const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole

				// no role defined, ignore directive
				if (!requiredRole) {
					return resolve.apply(this, args)
				}

				// see: src/api/src/schemaV2/context.ts
				const context = args[2]
				if (!context.auth.authenticated) {
					throw new Error('Not authorized')
				}

				return resolve.apply(this, args)
			}
		})
	}
}
