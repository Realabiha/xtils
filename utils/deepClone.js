const typeOf = require('./typeOf')
const objMap = new Map()
const deepClone = function (origin, target = {}) {
  if (objMap.get(origin)) return objMap.get(origin)
  objMap.set(origin, origin)
  Object.keys(origin).forEach(key => {
    const value = origin[key]

    if (typeof value !== 'object') {
      target[key] = value
    }

    if (Array.isArray(value)) {
      target[key] = deepClone(value, [])
    }

    if (typeOf(value) === 'Object') {
      target[key] = deepClone(value, {})
    }

  })
  return target
}

module.exports = deepClone