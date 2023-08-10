class Scheduler {
  constructor(limit) {
    this.queue = []
    this.limit = limit
    this.running = 0
  }
  add() {
    const ajax = function () {
      return new Promise((resolve, reject) => {
        const time = Math.random() * 2000 + 1000
        time > 2000 && console.log(请求出错)
        setTimeout(_ => resolve(time), time)
      })
    }
    this.queue.push(ajax)
  }
  run() {
    for (let i = 0; i < this.limit; i++) {
      this.next()
    }
  }
  next() {
    if (this.queue.length && this.running < this.limit) {
      this.running++
      const task = this.queue.shift()
      task().then(res => {
        console.log('res')
        this.running--
        this.next()
      }).catch(err => {
        console.log('err')
        task().then(res => {
          this.running--
          this.next()
        })
          .catch(err => {
            this.running--
          })
      })
    }
  }
}

Scheduler._ajax = function () {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, Math.random() * 2000 + 1000)
  })
}

const scheduler = new Scheduler(5)
scheduler.add()
scheduler.add()
scheduler.add()
scheduler.add()
scheduler.add()
scheduler.add()
scheduler.add()
scheduler.add()
scheduler.add()
scheduler.run


class Request {
  constructor(max) {
    // 最大并发数
    this.max = max || 6
    // 正在请求的数量
    this.count = 0
    // 待执行请求任务
    this.tasks = []
    // 单例实例
    this.instance = null
  }
  static getInstance(max) {
    if (!this.instance) {
      this.instance = new Request(max)
    }
    return this.instance
  }
  run(task, config = {}) {
    return new Promise((resolve, reject) => {
      const nextRequest = this.next(task, resolve, reject)
      nextRequest.config = task.config = config
      if (this.count < this.max) {
        nextRequest()
        this.count++
      } else {
        this.tasks.unshift(nextRequest)
      }
    })
  }
  next(task, resolve, reject) {
    return _ => {
      task(task.config)
        .then(res => resolve(res))
        .catch(err => reject(err))
        .finally(_ => {
          this.count--
          if (this.tasks.length) {
            const task = this.tasks.pop()
            task()
          }
        })
    }
  }
}

// new Request(5).run(_ => _).then()