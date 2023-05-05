const _new = function (constructor, ...args) {
  const that = Object.create(constructor.prototype)
  const result = constructor.call(that, ...args)
  if (typeof result === 'object' || typeof result === 'function') return result
  return that
}