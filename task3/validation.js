import * as isJs from 'is_js'

function validateString(input) {
    if (!(isJs.string(input))) {
        throw new Error(
            `value should be string, but you passed ${input} which is type ${typeof input}`
        )
    }
    if (isJs.empty(input)) {
        throw new Error(
            `string is empty`
        )
    }
}

export default validateString
