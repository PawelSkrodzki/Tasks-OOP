function validateString(input) {
    const isNotEmptyInputString = typeof input === "string" && input.length !== 0

    if (!isNotEmptyInputString) {
        throw new Error(
            `value should be string, but you passed ${input} which is type ${typeof input}`
        );
    }
}

function throwErrorIsClassIsNotSameInstance(element, classType) {
    if (!(element instanceof classType)) {
        throw new Error(`${element} is not instanceof class ${classType}`);
    }
}


export {
    throwErrorIsClassIsNotSameInstance,
    validateString,
}