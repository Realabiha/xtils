const scheduler = function (limit = 1) {
  this.queue = []
  this.limit = limit
  this.running = 0
}
scheduler.prototype.add = function (task) {
  const ptask = () => {
    return new Promise((resolve, reject) => {
      task()
      setTimeout(resolve, this.queue.length * 100)
    })
  }
  this.queue.unshift(ptask)
}
scheduler.prototype.do = function () {
  if (this.queue.length && this.running < this.limit) {
    const ptask = this.queue.pop()
    ptask().then(_ => {
      this.running--
      this.do()
    })
    this.running++
  }
}