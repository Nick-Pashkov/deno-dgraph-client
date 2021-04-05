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
