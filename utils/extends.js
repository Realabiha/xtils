/* 
1.原型链 直接修改原型 没有继承实例属性
2.构造函数 继承实例属性 没有继承原型
3.组合 调用两次父类构造函数
4.寄生组合
*/
const extend = function (sub, sup) {
  const F = function () { }
  F.prototype = sup.prototype
  sub.prototype = new F()
  sub.prototype.constructor = sub
  sub.prototype.from = sup
}

const person = function (name, age) {
  this.name = name
  this.age = age
}
person.prototype.walk = function () {
  console.log('walking')
}

const student = function (name, age, school) {
  this.school = school
  this.test = function () {
    console.log('test')
  }
  person.call(this, name, age)
}

extend(student, person)
const stu = new student('abiha', '18', '大大大大')

student.prototype.study = function () {
  console.log('studying')
}
console.log(stu)
stu.walk()
stu.study()
console.log(student.prototype)
