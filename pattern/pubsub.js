// const store = Object.create(null)
function pubsub() {
    // this.store = Object.create(null)
    Object.defineProperty(this, 'store', {
        value: Object.create(null),
        writable: false,
        enumerable: false,
        configurable: false
    })
}
pubsub.prototype.emit = function (type, data) {
    const callbacks = this.store[type] || []
    if (callbacks.length) callbacks.forEach(callback => callback(data))
}
pubsub.prototype.on = function (type, callback) {
    if (this.store[type] === undefined) {
        this.store[type] = []
    }
    this.store[type].push(callback)

}
pubsub.prototype.once = function (type, callback) {
    let flag = true
    const onceCallback = function (data) {
        if (!flag) return
        flag && callback(data)
        flag = false
    }
    this.on(type, onceCallback)
}
pubsub.prototype.off = function (type) {
    delete this.store[type]
}

module.exports = pubsub