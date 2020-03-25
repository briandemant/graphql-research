import { printSchemaWithDirectives } from '@graphql-toolkit/common'
import { Types, PluginFunction, addFederationReferencesToSchema } from '@graphql-codegen/plugin-helpers'
import { parse, visit, GraphQLSchema, printSchema } from 'graphql' // funcs
import { ObjectTypeDefinitionNode, TypeNode } from 'graphql' // types

// import { parseMapper } from '@graphql-codegen/visitor-plugin-common'
// import { TypeScriptResolversVisitor } from '@graphql-codegen/typescript-resolvers'

// based on '@graphql-codegen/typescript-resolvers'
export const plugin: PluginFunction<any> = (schema: GraphQLSchema, documents: Types.DocumentFile[], config: any) => {
	const transformedSchema = config.federation ? addFederationReferencesToSchema(schema) : schema
	// const visitor = new TypeScriptResolversVisitor(config, transformedSchema);

	const printedSchema = config.federation
		? printSchemaWithDirectives(transformedSchema)
		: printSchema(transformedSchema)
	const astNode = parse(printedSchema)

	// does magic it seems
	// const visitorResult = visit(astNode, { leave: visitor }); // DOESN'T WORK?!?, versions mismatch?
	// console.log('### visitorResult ### ', visitorResult)

	// type cast it
	const objectTypes: ObjectTypeDefinitionNode[] = astNode.definitions
		.filter(def => def.kind === 'ObjectTypeDefinition')
		.map(node => node as ObjectTypeDefinitionNode)

	// THIS might probably be easier if the F***ING! visitor stuff worked, but hey!
	const fieldResolvers: string[] = []
	objectTypes.forEach(el => {
		// console.log('### el', el.name)
		const queryResolver = 'any' // TODO, resolve it somehow... maybe with a proper VISITOR!!

		fieldResolvers.push(`/**
		**
		** ${el.name.value} 
		**
		**/`)

		el.fields?.forEach(field => {
			// console.log('### field', field)
			const returnType = `null` // // TODO resolve return type from field.type as TypeNode
			const fieldDesc = field.description ? `/** ${field.description.value} **/` : ''
			const resolverArgs = `parent:any, args:any, context:any, info:any` // TODO: 'any' shouldn't be necessary if the queryResolver is correct

			fieldResolvers.push(`
			${fieldDesc}
			const ${el.name.value}_${field.name.value}: ${queryResolver} = async (${resolverArgs}) => { 
				return ${returnType}
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
	//`

	return {
		content: [prelude, fieldResolvers.join('\n')].join('\n'),
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
