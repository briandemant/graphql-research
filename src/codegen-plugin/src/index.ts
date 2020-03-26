import { printSchemaWithDirectives } from '@graphql-toolkit/common'
import { Types, PluginFunction, addFederationReferencesToSchema } from '@graphql-codegen/plugin-helpers'
import { parse, GraphQLSchema, printSchema } from 'graphql' // funcs
import { ObjectTypeDefinitionNode } from 'graphql' // types
import { camelCase, upperFirst, flow } from 'lodash'

// depends on '@graphql-codegen/typescript-resolvers'
export const plugin: PluginFunction<any> = (schema: GraphQLSchema, documents: Types.DocumentFile[], config: any) => {
	const transformedSchema = config.federation ? addFederationReferencesToSchema(schema) : schema

	const printedSchema = config.federation
		? printSchemaWithDirectives(transformedSchema)
		: printSchema(transformedSchema)
	const astNode = parse(printedSchema)

	// utils
	const pascalCase = flow(camelCase, upperFirst)

	const imports: string[] = []
	const resolverTypesImports: string[] = []
	const fieldResolvers: string[] = []

	imports.push(`import { GraphQLResolveInfo } from 'graphql'`)
	resolverTypesImports.push(`${config.typesPrefix}ResolversTypes`)

	// Map out all the objects and their fields
	const objectTypes: ObjectTypeDefinitionNode[] = astNode.definitions
		.filter(def => def.kind === 'ObjectTypeDefinition')
		.map(node => node as ObjectTypeDefinitionNode)

	// build a boilerplate resolver function
	// for each object's fields
	// and export the Type for the resolver
	objectTypes.forEach(el => {
		if (el.name.value === 'CategoryField') console.log('### el', JSON.stringify(el))

		resolverTypesImports.push(`${config.typesPrefix}${el.name.value}Resolvers`)

		fieldResolvers.push(`/**
		**
		** ${el.name.value} 
		**
		**/`)

		el.fields?.forEach(field => {
			// field description, if any
			const fieldDesc = field.description ? `/* ${field.description.value} */` : ''

			const resolverName = camelCase([el.name.value, field.name.value].join('_'))
			const resolverTypeName = pascalCase(['type', el.name.value, field.name.value].join('_'))
			// const typeResolverString = `export type TCategoryListingConnectionType = GQLCategoryResolvers['listingConnection']`
			const typeResolverString = `export type ${resolverTypeName} = ${config.typesPrefix}${el.name.value}Resolvers['${field.name.value}']`

			// parse any field arguments
			let parsedArgs = 'args'
			if (field.arguments && field.arguments.length) {
				const prettyArgs = field.arguments.map(arg => arg.name.value)
				// need to keep the casing from `config.typesPrefix`, so `pascalCase`'ing the whole thing won't work
				parsedArgs = `{ ${prettyArgs.join(', ')} }`
			}
			fieldResolvers.push(`
			${fieldDesc}
			${typeResolverString}
			const ${resolverName} = async (parent, ${parsedArgs}, context, info) => { 
				// @ts-ignore
				return null
			}
			`)
		})
	})

	const prelude = `
	// Generated boilerplate field resolvers!
	//
	// Cut-n-paste and fill-em-up
	// with glorious logic
	// 
	// goodluckhavefun!
	//
	`

	// Huge dependency on other plugins and certain "codegen" settings
	const prettyResolverTypes = `import { ${resolverTypesImports.join(', ')} } from './server-types'`

	/*
		fieldResolvers: SHOULD LOOK SOMETHING LIKE THIS:
		...
		export type TypeCategoryListingConnection = GQLCategoryResolvers['listingConnection']
		const categoryListingConnection:TCategoryListingConnectionType = async (parent, {some, specific, param}, context, info) => {
			// @ts-ignore
			return null
		}
		...
	*/

	return {
		content: [prelude, imports.join('\n'), prettyResolverTypes, fieldResolvers.join('\n')].join('\n'),
	}
}

// const boilerplateResolvers: CodegenPlugin = {
// 	plugin: (schema: GraphQLSchema, documents: Types.DocumentFile[], config: any) => {
// 		// const typesMap = schema.getTypeMap()
// 		console.log('schema ###', schema)
// 		console.log('documents ###', documents)
// 		return '// hello \n'
// 	},
// 	addToSchema: undefined,
// 	validate: async (
// 		schema: GraphQLSchema,
// 		documents: Types.DocumentFile[],
// 		config: any,
// 		outputFile: string,
// 		allPlugins: Types.ConfiguredPlugin[]
// 	) => {
// 		// hi there!
// 		return
// 	},
// }

// module.exports = boilerplateResolvers
