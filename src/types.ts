export type DgraphClientSettings = {
    host: string
    port: number
}

export type DgraphRequest = {
    query: string
    operationName?: string
    variables?: any
}

export type DgraphQuery = {
    type: string
    returns: Array<any>
    filter?: any
    offset?: number
    count?: number
    order?: number
}

export type DgraphInput = {
    type: string
    input: Array<any>
    returns: Array<any>
}

export type DgraphInputUpdate = {
    type: string
    filter: any
    returns: Array<any>
    set?: Record<string, any>
    remove?: Record<string, any>
}

export type DgraphInputDelete = {
    type: string
    filter: any
}

export class DgraphException extends Error {
    constructor(message: string) {
        super(message)
        this.message = message
        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)
    }
}
