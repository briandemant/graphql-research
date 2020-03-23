

## Generation of typescript types from Graphql

```
yarn build:gen
```
outputs:

```
src/api/src/_gen/client-types.tsx
src/api/src/_gen/server-types.ts
```


## Changelog:

1. [Add graphql to typescript code generation](https://github.com/briandemant/graphql-research/tree/01-graphql-to-ts-types)
2. [implement the basic api server](https://github.com/briandemant/graphql-research/tree/02-basic-api)

* [Go back to master](https://github.com/briandemant/graphql-research/)
*



### Resources
https://graphql-code-generator.com/docs/getting-started/lifecycle-hooks
https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
https://github.com/prisma-labs/graphql-yoga

https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976
https://blog.apollographql.com/designing-graphql-mutations-e09de826ed97

### Tools
http://nathanrandal.com/graphql-visualizer/

### Dataloaders
https://www.apollographql.com/docs/apollo-server/data/data-sources/

### persistent queries
https://www.apollographql.com/docs/apollo-server/performance/apq/
https://github.com/apollographql/apollo-link-persisted-queries
https://github.com/leoasis/graphql-persisted-document-loader

### upload
https://blog.apollographql.com/apollo-server-file-upload-best-practices-1e7f24cdc050

### Testing
https://github.com/addityasingh/graphql-pino-middleware/blob/master/src/__tests__/index.test.ts
https://medium.com/entria/testing-a-graphql-server-using-jest-4e00d0e4980e
https://github.com/prisma-labs/graphql-yoga/issues/616

### Tracing, metrics & error
https://dev.to/andre/handling-errors-in-graphql--2ea3
https://github.com/addityasingh/graphql-lightstep-middleware/blob/master/src/index.ts

### client stuff
https://github.com/zeit/next.js/tree/canary/examples/with-typescript-graphql
https://github.com/borisowsky/next-advanced-starter
https://github.com/piglovesyou/graphql-let#readme

### plugin and middlewares
https://www.apollographql.com/docs/apollo-server/integrations/plugins/
https://github.com/BrunoScheufler/graphql-middleware-sentry
https://github.com/maticzav/graphql-shield
