const lazyMan = function (name) {
  this.name = name
  this.queue = []
  const task = () => {
    console.log(`hi ${name}`)
    this.next()
  }
  this.queue.push(task)
  // 保证task收集完成
  setTimeout(_ => this.next())
}
lazyMan.prototype.eat = function (food) {
  const task = () => {
    console.log(`eat ${food}`)
    this.next()
  }
  this.queue.push(task)
  return this
}
lazyMan.prototype.sleep = function (time) {
  const task = () => {
    console.log(`sleep ${time}s`)
    setTimeout(_ => this.next(), time * 1000)
  }
  this.queue.push(task)
  return this
}
lazyMan.prototype.next = function () {
  if (this.queue.length) {
    this.queue.shift()()
  }
}
lazyMan.prototype.sleepFirst = function (time) {
  const task = () => {
    console.log(`sleep ${time}s`)
    setTimeout(_ => this.next(), time * 1000)
  }
  this.queue.unshift(task)
  return this
}