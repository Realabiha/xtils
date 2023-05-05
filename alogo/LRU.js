// Least Recently Used 最近最少使用
function LRUCache(max) {
    this.keys = []
    this.cache = Object.create(null)
    this.max = max
}
LRUCache.prototype.get = function (key) {
    if (this.cache[key]) {
        // 调正位置
        remove(this.keys, key)
        this.keys.push(key)
        // 返回缓存的值
        return this.cache[key]
    }
    return null
}
LRUCache.prototype.set = function (key, value) {
    if (this.cache[key]) {
        // 更新缓存的值
        this.cache[key] = value
        // 调整位置
        remove(this.keys, key)
        this.keys.push(key)
        return
    }
    // 缓存值
    this.cache[key] = value
    this.keys.push(key)
    // 缓存超过最大限制
    if (this.max && this.keys.length && this.keys.length > this.max) {
        const key = this.keys[0]
        remove(this.keys, key)
        this.cache[key] = null
    }
}

function remove(keys, key) {
    if (keys.length === 0) return
    const i = keys.indexOf(key)
    i > -1 && keys.splice(i, 1)
}

module.exports = LRUCache