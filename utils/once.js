const once = function (fn) {
  let called = false
  const that = this
  return function () {
    if (called) return
    called = true
    fn.apply(that, arguments)
  }
}


const fn = function () {
  console.log('fn')
}

// setInterval(once(fn), 1000)
let uid = 0
class Intercepter {
  constructor() {
    this.handlers = []
  }
  use(fn) {
    fn.uid = uid++
    this.handlers.push(fn)
  }
  forEach() {
    this.handlers.forEach(handler => handler())
  }
}

const intercepter = new Intercepter()


console.log(intercepter)