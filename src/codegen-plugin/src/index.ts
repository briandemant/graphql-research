import { printSchemaWithDirectives } from '@graphql-toolkit/common'
import { parseMapper, ExternalParsedMapper } from '@graphql-codegen/visitor-plugin-common'
import { Types, PluginFunction, addFederationReferencesToSchema } from '@graphql-codegen/plugin-helpers'
import { parse, visit, GraphQLSchema, printSchema } from 'graphql' // funcs
import { ObjectTypeDefinitionNode, TypeNode } from 'graphql' // types
import { camelCase, upperFirst, flow } from 'lodash'

// based on '@graphql-codegen/typescript-resolvers'
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
	resolverTypesImports.push('GQLResolversTypes')

	// resolve context type
	let contextType = `context:any`
	if (config.contextType) {
		const parsedContext = parseMapper(config.contextType) as ExternalParsedMapper
		imports.push(`import { ${parsedContext.import} } from '${parsedContext.source}'`)
		contextType = parsedContext.import
	}

	// Map out all the objects and their fields
	const objectTypes: ObjectTypeDefinitionNode[] = astNode.definitions
		.filter(def => def.kind === 'ObjectTypeDefinition')
		.map(node => node as ObjectTypeDefinitionNode)

	// build a boilerplate resolver function
	// for each object's fields
	objectTypes.forEach(el => {
		if (el.name.value === 'CategoryField') console.log('### el', JSON.stringify(el))

		fieldResolvers.push(`/**
		**
		** ${el.name.value} 
		**
		**/`)

		el.fields?.forEach(field => {
			// let returnType = `null` // // TODO resolve return type from field.type as TypeNode

			// field description, if any
			const fieldDesc = field.description
				? `/*
			${field.description.value}
			*/`
				: ''

			const resolverName = camelCase([el.name.value, field.name.value].join('_'))

			const resolverReturnType = _resolveReturnType(field.type)
			const returnType =
				resolverReturnType === 'any' ? `${resolverReturnType}` : `GQLResolversTypes['${resolverReturnType}']`
			console.log('#### returnTypes', returnType)

			// parse any field arguments
			let parsedArgs = 'args:any'
			if (field.arguments && field.arguments.length) {
				const prettyArgs = field.arguments.map(arg => arg.name.value)
				// need to keep the casing from `config.typesPrefix`, so `pascalCase`'ing the whole thing won't work
				const argTypeString = [config.typesPrefix, el.name.value, pascalCase(field.name.value), 'Args'].join('')
				resolverTypesImports.push(argTypeString)
				parsedArgs = `{ ${prettyArgs.join(', ')} }:${argTypeString}`
			}

			const resolverArgs = `parent:any, ${parsedArgs}, context:${contextType}, info:GraphQLResolveInfo`

			fieldResolvers.push(`
			${fieldDesc}
			const ${resolverName} = async (${resolverArgs}):Promise<${returnType}> => { 
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

	// Big dependency on other plugins and "codegen" settings
	const prettyResolverTypes = `import { ${resolverTypesImports.join(', ')} } from './server-types'`

	return {
		content: [prelude, imports.join('\n'), prettyResolverTypes, fieldResolvers.join('\n')].join('\n'),
	}
}

// TODO: Support for "Lists of" and "NonNulls" types
const _resolveReturnType = (fieldType: TypeNode): string => {
	// list of types
	if (fieldType.kind === 'NonNullType' || fieldType.kind === 'ListType') {
		// list of TypeNodes
		if (fieldType.type && fieldType.type.kind === 'ListType') {
			// !!! recursive
			return _resolveReturnType(fieldType.type)
		} else if (fieldType.type && fieldType.type.kind === 'NamedType') {
			// leaf
			return fieldType.type.name.value
		}
	} else if (fieldType.kind === 'NamedType') {
		// leaf
		return fieldType.name.value
	}

	return 'any'
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
