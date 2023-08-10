const inherit = function (Super) {
  const prototype = Super.prototype
  const Sub = function (options) {
    this.init(options)
  }
  // const F = function () { }
  // F.prototype = prototype
  // Sub.prototype = new F()

  // Sub.prototype = Object.create(prototype)
  Object.setPrototypeOf(Sub.prototype, Object.create(prototype))

  Sub.prototype.constructor = Sub

  Sub['from'] = Super

  return Sub
}

const Super = function (options) {
  this.init(options || {})
}
Super.prototype.walk = function () {
  console.log(`${this.name} is walking!`)
}
Super.prototype.init = function (options) {
  const { name, age, sex } = options
  this.name = name
  this.age = age
  this.sex = sex
}

const Sub = inherit(Super)

const sub = new Sub({ name: 'abiha', age: 18, sex: 'male' })
sub.walk()
console.log(sub)


module.exports = inherit