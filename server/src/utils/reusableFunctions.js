// the function creates the update keys and values of the passed in object
export function createDynamicKeysAndValues(dataObject) {
    const values = [];
    const keys = [];
    for (const [key, value] of Object.entries(dataObject)) {
        if (!value && value !== 0) continue; // the value must not be undefined or null

        // appending the data in the list
        values.push(value);
        keys.push(`${key}=$${values.length}`);

    }

    return [values, keys];
}

// the function which make application logs

