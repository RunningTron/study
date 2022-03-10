function deepCopy(obj) {
    let copyObj = Array.isArray(obj) ? [] : {}
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (obj[i] && typeof obj[i] === 'object') {
                copyObj[i] = deepCopy(obj[i])
            } else {
                copyObj[i] = obj[i]
            }
        }
    }
    return copyObj
}

let arr = ['a', 'b', {name: 'xx', age: 18}]
let arr1 = deepCopy(arr)
arr[2]["name"] = 'yyy'
console.log(arr)
console.log(arr1)
