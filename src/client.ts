import { DgraphClientSettings, DgraphQuery, DgraphInput, DgraphInputUpdate, DgraphInputDelete, DgraphException } from './types.ts'
import Request from './http.ts'
import { queryOne, queryMultiple } from './query.ts'
import { mutationAdd, mutationUpdate, mutationDelete } from './mutation.ts'

export default class DgraphClient {
    private request: Request

    constructor(settings: DgraphClientSettings) {
        const { host, port } = settings
        this.request = new Request(`http://${host}:${port}`)
    }

    async login(username: string, password: string) {
        const gql = `mutation {
            login(userId: "${username}", password: "${password}") {
                response {
                    accessJWT
                    refreshJWT
                }
            }
        }`

        try {
            const request = await this.request.admin(gql)
            const { response } = request.data.login

            this.request.token = response.accessJWT
            return request
        } catch (e) {
            throw new DgraphException(e.message)
        }
    }

    async getObject(type: string, id: string, returns: Array<any>, index = 'id') {
        const tStart = Date.now()
        const gql = queryOne({
            object: type,
            index: index,
            value: id,
            returns
        })

        try {
            const { data } = await this.request.graphql({query: gql})
            const execTime = Date.now() - tStart
            console.log(`query: get${type} - ${execTime}ms`)
            return data[`get${type}`]
        } catch (e) {
            throw new DgraphException(e.message)
        }
    }

    async queryObjects(params: DgraphQuery) {
        const { type, filter, order } = params
        const tStart = Date.now()
        const gql = queryMultiple(params)

        try {
            const { data } = await this.request.graphql({
                query: gql,
                variables: { filter, order }
            })

            const execTime = Date.now() - tStart
            console.log(`query: query${type} - ${execTime}ms`)
            return data[`query${type}`]
        } catch (e) {
            throw new DgraphException(e.message)
        }
    }

    async createObject(params: DgraphInput) {
        const { type, input } = params
        const tStart = Date.now()
        const gql = mutationAdd(params)

        try {
            const { data } = await this.request.graphql({
                query: gql,
                variables: { input }
            })

            const execTime = Date.now() - tStart
            console.log(`mutation: add${type} - ${execTime}ms`)
            return data[`add${type}`]
        } catch (e) {
            throw new DgraphException(e.message)
        }
    }

    async updateObjects(params: DgraphInputUpdate) {
        const { filter, type, set, remove } = params
        const tStart = Date.now()
        const gql = mutationUpdate(params)

        try {
            const { data } = await this.request.graphql({
                query: gql,
                variables: { patch: { filter, set, remove } }
            })
            const execTime = Date.now() - tStart
            console.log(`mutation: update${type} - ${execTime}ms`)
            return data[`update${type}`]
        } catch (e) {
            throw new DgraphException(e.message)
        }
    }

    async deleteObjects(params: DgraphInputDelete) {
        const { type, filter } = params
        const tStart = Date.now()
        const gql = mutationDelete(params)

        try {
            const { data } = await this.request.graphql({
                query: gql,
                variables: { filter }
            })
            const execTime = Date.now() - tStart
            console.log(`mutation: delete${type} - ${execTime}ms`)
            return data[`delete${type}`]
        } catch (e) {
            throw new DgraphException(e.message)
        }
    }
}
