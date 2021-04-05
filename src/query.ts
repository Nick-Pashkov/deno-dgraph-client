const indent = (times = 1, spaces = 4) => Array(spaces * times + 1).join(' ')

const vars = (type: string, filter: any, order: any) => {
    const paramsExist = filter || order
    if(!paramsExist) return ""

    const gql: Array<string> = []
    if(filter) gql.push(`$filter: ${type}Filter`)
    return `(${gql.join(', ')})`
}

const args = (filter: any, count: number, offset: number, order: any) => {
    const paramsExist = filter || count || offset || order
    if(!paramsExist) return ""

    const gql: Array<string> = []
    if(filter) gql.push(`filter: $filter`)
    if(count) gql.push(`first: ${count}`)
    if(offset) gql.push(`offset: ${offset}`)

    return `(${gql.join(', ')})`
}

export const queryOne = (params: any) => {
    const { type, index, value, returns } = params

    const gql = `
    query ${type} {
        get${type}(${index}: ${JSON.stringify(value)}) {
            ${returns.join(`\n${indent(3)}`)}
        }
    }`

    return gql
}

export const queryMultiple = (params: any) => {
    const { type, filter, count, offset, order, returns } = params
    const gql = `
    query ${type}${vars(type, filter, order)} {
        query${type}${args(filter, count, offset, order)} {
            ${returns.join(`\n${indent(3)}`)}
        }
    }
    `

    return gql
}
