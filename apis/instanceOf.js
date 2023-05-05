const instanceOf = function (target, constructor) {
  let proto = target?.__proto__
  while (proto) {
    if (proto === constructor.prototype) return true
    proto = proto.__proto__
  }
  return false
}
console.log(instanceOf(null, Object))