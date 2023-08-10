const instanceOf = function (target, constructor) {
  // let proto = target?.__proto__
  // while (proto) {
  //   if (proto === constructor.prototype) return true
  //   proto = proto.__proto__
  // }
  // return false
  let prototype = Object.getPrototypeOf(target)
  if (prototype) {
    if (prototype === constructor.prototype) return true
    return instanceOf(prototype, constructor)
  }
  return false
}
console.log(instanceOf([], Array))