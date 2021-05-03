const indent = (times = 1, spaces = 4) => Array(spaces * times + 1).join(' ')

export const mutationAdd = (params: any) => {
    const { type, returns } = params

    const gql = `
    mutation add${type}($input: [Add${type}Input!]!) {
        add${type}(input: $input) {
            ${type.toLowerCase()} {
                ${returns.join(`\n${indent(4)}`)}
            }
        }
    }`

    return gql
}

export const mutationUpdate = (params: any) => {
    const { type, returns } = params
    const gql = `
    mutation update${type}($patch: Update${type}Input!) {
        update${type}(input: $patch) {
            ${type.toLowerCase()} {
                ${returns.join(`\n${indent(4)}`)}
            }
        }
    }`

    return gql
}

export const mutationDelete = (params: any) => {
    const { type } = params
    const gql = `
    mutation delete${type}($filter: ${type}Filter!) {
        delete${type}(filter: $filter) {
            msg
        }
    }`

    return gql
}
