import * as path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, '../../src/schemaV2/*.gql'))
const typesMerged = mergeTypes(typesArray)

export default typesMerged
