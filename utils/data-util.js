// array destructuring and replacing _id with id
export const replaceMongoIdInArray = (array) => {
    const mappedArray = array.map(item => {
        return {
            id: item._id.toString(),
            ...item
        }
    }).map(({ _id, ...rest }) => rest);

    return mappedArray;
}

// object destructuring and replacing _id with id
export const replaceMongoIdInObject = (obj) => {
    if (!obj) return null;

    const { _id, ...updateObj } = { ...obj, id: obj._id.toString() };

    return updateObj;
}