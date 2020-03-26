import { SchemaDirectiveVisitor } from 'apollo-server'
import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from 'graphql'
import { Context } from '../schema/context'

// Modified "copy-pasta" from the apollo-server docs
export class AuthDirective extends SchemaDirectiveVisitor {
	public visitObject(type: GraphQLObjectType) {
		// @ts-ignore
		type._requiredAuthRole = this.args.requires
		this.ensureAuth(type)
	}

	// Visitor methods for nested types like fields and arguments
	// also receive a details object that provides information about
	// the parent and grandparent types.
	public visitFieldDefinition(field: GraphQLField<any, any>, details: any) {
		// @ts-ignore
		field._requiredAuthRole = this.args.requires
		this.ensureAuth(details.objectType)
	}

	// Wrap object and nested fields
	private ensureAuth(objectType: GraphQLObjectType) {
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
				const context: Context = args[2]
				if (!context.user.authenticated || !context.user.roles.includes(requiredRole)) {
					throw new Error('Not authorized')
				}

				return resolve.apply(this, args)
			}
		})
	}
}
