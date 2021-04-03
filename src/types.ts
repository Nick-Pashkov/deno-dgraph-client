interface DgraphClientSettings {
    host: string,
    port: number
}

class DgraphException extends Error {
    constructor(message: string) {
        super(message)
        this.message = message
        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)
    }
}

export type {
    DgraphClientSettings
}

export {
    DgraphException
}
