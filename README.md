# Dgraph Client for Deno

A simple HTTP client to work with Dgraph on Deno. It exposes a `DgraphClient` class which has many functionalities to make your project with Dgraph simpler.

## Login

In case you are using the [ACL feature](https://dgraph.io/docs/enterprise-features/access-control-lists/#enable-enterprise-acl-feature) of Dgraph, you need to first specify a username and a password to login to Dgraph.

A basic usage example

```ts
import { DgraphClient } from 'https://raw.githubusercontent.com/Nick-Pashkov/deno-dgraph-client/master/mod.ts'

const Dgraph = new DgraphClient({
    host: 'localhost',
    port: 8080
})

// The default user and password for root
await Dgraph.login('groot', 'password')
```
After logging in, you can proceed to make queries to the database.

## Getting objects
`DgraphClient` class exposes some methods for reading the database records

- `getObject(type: string, id: string, fields: Array<any>, idField = 'id')`
- `queryObjects(type: string, fields: Array<any>)`

Example usage:
```ts
await Dgraph.getObject('Product', '0x4', ['id', 'name'])

// Returns a single object:
// { id: 0x4, name: 'Product name' }
```

```ts
await Dgraph.queryObjects('Product', ['id', 'name'])

// Returns an array of objects:
// [
//    { id: 0x4, name: 'Product name' }
// ]
```