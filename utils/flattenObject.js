const data = { a: 1, b: [2, { c: 3 }] }
const result = {}
function flattenObject(data, _ = '') {
  Object.keys(data).forEach(key => {
    const value = data[key]
    if (typeof value === 'object') {
      return flattenObject(value, key)
    }
    result[_ ? (_ + '.' + key) : key] = value
  })
}
flattenObject(data)

console.log(result, 'result')