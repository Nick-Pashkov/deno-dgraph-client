import axios from "https://deno.land/x/axiod/mod.ts"
import { DgraphException, DgraphRequest } from './types.ts'

class DgraphHTTP {
    private url: string
    private _token?: string

    constructor(url: string) {
        this.url = url
    }

    async admin(gql: string) {
        const { data } = await axios.post(`${this.url}/admin`, gql, {
            headers: { 'Content-Type': 'application/graphql' }
        })
        if(data.errors) throw new DgraphException(data.errors[0].message)
        return data
    }

    async graphql(request: DgraphRequest) {

        const { data } = await axios.post(`${this.url}/graphql`, request, {
            headers: {
                'X-Dgraph-AccessToken' : this._token || null,
                'Content-Type': 'application/json'
            }
        })
        if(data.errors) throw new DgraphException(data.errors[0].message)
        return data
    }

    set token(token: string) {
        this._token = token
    }
}

export default DgraphHTTP
