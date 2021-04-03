import { DgraphClientSettings } from './types.ts'
import Request from './http.ts'

export default class DgraphClient {
    private secrets: any
    private request: Request

    constructor(settings: DgraphClientSettings) {
        const { host, port } = settings
        this.secrets = null
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
        } catch (error) {
            return error.message
        }
    }

    async getObject(type: string, id: string, fields: Array<any>, idField = 'id') {
        const gql = `query {
            get${type}(${idField}: "${id}") {
                ${fields.join(' ')}
            }
        }`.trim()

        try {
            const { data } = await this.request.graphql(gql)
            return data[`get${type}`]
        } catch (error) {
            return error.message
        }
    }

    async queryObjects(type: string, fields: Array<any>) {
        const gql = `query {
            query${type} {
                ${fields.join(' ')}
            }
        }`.trim()

        try {
            const { data } = await this.request.graphql(gql)
            return data[`query${type}`]
        } catch (error) {
            return error.message
        }
    }
}
