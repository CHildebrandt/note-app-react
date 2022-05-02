function removePropertyImmutably(obj: { [key: string]: boolean; }, key: string) {
    return Object.keys(obj).reduce((acc, curr) => curr === key ? acc : { ...acc, [curr]: obj[curr] }, {});
}

export default removePropertyImmutably;