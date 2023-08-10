class Schduler {
  constructor(max) {
    this.max = max
    this.queue = []
    this.index = 0
    this.count = 0
    this.result = []
  }
  request() {
    for (let i = 0; i < this.max; i++) {
      const task = this.queue[this.index]
      if (task) {
        task().then(res => {
          console.log(`${res}_${this.count}`)
          this.result[this.index] = res
          this.index++
          this.count++
          this.next()
          if (this.count === this.queue.length) {
            console.log(this.result, 'result')
            console.log(`全部请求完成`)
          }
        }).catch()
      }
    }
  }
  add(task) {
    task = task || function () {
      return new Promise((resolve, reject) => {
        const delay = Math.random() * 3000 + 1000
        setTimeout(_ => resolve(delay), delay)
      })
    }
    this.queue.push(task)
  }
  next() {
    if (this.index < this.queue.length) {
      const task = this.queue[this.index]
      if (task) {
        task().then(res => {
          console.log(`${res}_${this.count}`)
          this.result[this.index] = res
          this.index++
          this.count++
          this.next()
          if (this.count === this.queue.length) {
            console.log(this.result, 'result')
            console.log(`全部请求完成`)
          }
        }).catch()
      }
    }
  }
}

// const schduler = new Schduler(3)
// schduler.add()
// schduler.add()
// schduler.add()
// schduler.add()

// schduler.request()


class Pubsub {
  constructor() {
    this.store = Object.create(null)
  }
  emit(type, data) {
    const cbs = this.store[type] || []
    cbs.forEach(cb => cb(data))
  }
  on(type, cb) {
    this.store[type] = this.store[type] || []
    this.store[type].push(cb)
  }
  once(type, cb) {
    this.store[type] = this.store[type] || []
    const onceCb = data => {
      cb(data)
      this.off(type, onceCb)
    }
    onceCb.fn = cb
    this.store[type].push(onceCb)
  }
  off(type, cb) {
    const cbs = this.store[type]
    if(!cbs) return
    if (!cb) return delete this.store[type]
    const index = cbs.findIndex(_cb => _cb === cb || _cb.fn === cb)
    if (index > -1) this.store[type].splice(index, 1)
  }
}
