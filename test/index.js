const bubbleSort = function (array) {
  const length = array.length
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const vi = array[j]
      const vj = array[j + 1]
      const temp = vi
      if (vi > vj) {
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  console.log(array)
}
// bubbleSort([2, 1, 3, 7, 4, 6, 5])

const mergeSort = function (array) {
  console.log(array)
  if (array.length <= 1) return array
  const first = array.splice(0, 1)
  const left = []
  const right = []
  for (let i = 0; i < array.length; i++) {
    const v = array[i]
    if (v > first[0]) {
      right.push(v)
    } else {
      left.push(v)
    }
  }
  return mergeSort(left).concat(first).concat(mergeSort(right))
}

// console.log(mergeSort([2, 1, 3, 7, 4, 6, 5]))

// 
const binarySearch = function (array, target, start = 0, end = array.length) {
  if (start >= end) return -1
  let mid = Math.floor((start + end) / 2)
  if (array[mid] === target) return mid
  if (array[mid] < target)
    return binarySearch(array, target, ++mid, end)
  if (array[mid] > target)
    return binarySearch(array, target, start, --mid)
  return -1
}

// console.log(binarySearch([1, 3], 2))

const treeData = {
  value: '1',
  children: [
    {
      value: 2,
      children: [
        { value: 3 },
        { value: 4 }
      ]
    },
    { value: 5 }
  ]
}
const dfs = function (data = {}) {
  const { value, children } = data
  // console.log(value, 'value')
  if (children) {
    children.forEach(child => dfs(child))
  }
}
// dfs(treeData)

const bfs = function (data = {}) {
  const queue = []
  queue.unshift(data)
  while (queue.length) {
    const { value, children } = queue.pop()
    // console.log(value, 'value')
    children && children.forEach(child => queue.unshift(child))
  }
}

bfs(treeData)


class LRU {
  constructor() {
    this.cache = Object.create(null)
    this.queue = []
    this.max = 5
  }
  get(key) {
    const _index = this.queue.indexOf(key)
    // 存在
    if (_index >= 0) {
      this.queue.splice(_index, 1)
      this.queue.push(key)
      return this.cache[key]
    }
  }
  set(key, value) {
    this.cache[key] = value

    const _index = this.queue.indexOf(key)

    // 存在
    if (_index >= 0) {
      this.queue.splice(_index, 1)
      this.queue.push(key)
      return
    }
    // 不存在未超过max
    if (this.queue.length < this.max) {
      return this.queue.push(key)
    }
    // 不存在且超过max
    const [_key] = this.queue.splice(0, 1)
    delete this.cache[_key]
    this.queue.push(key)
  }
}


// const lru = new LRU()
// lru.set('1', 1)
// lru.set('2', 2)
// lru.set('3', 3)
// lru.set('4', 4)
// lru.set('5', 5)
// console.log(lru, 'lru')
// lru.set('6', 6)
// console.log(lru, 'lru')
// lru.get('2')
// lru.get('10')
// console.log(lru, 'lru')


const slicePiece = function () {
  const total = 96
  const piece = 10
  let index = 0

  const loop = function () {
    console.log('====')
    const length = Math.min(total - index, piece)
    for (let i = 0; i < length; i++) {
      console.log(index++)
    }
    if (index < total) {
      setTimeout(loop, 1000)
    }
  }
  setTimeout(loop, 1000)
}

// slicePiece()



class lazyMan {
  constructor(name) {
    this.tasks = []
    this.name = name
    const task = () => {
      console.log(`hi, this is ${this.name}`)
      this.next()
    }
    this.tasks.unshift(task)
    setTimeout(_ => this.next())
    // this.next()
  }
  next() {
    const task = this.tasks.pop()
    task && task()
  }
  sleep(time) {
    // 延迟time后取出下一个任务执行
    setTimeout(_ => {
      console.log(`${this.name} sleep end`)
      this.next()
    }, time)
    const task = () => {
      console.log(`${this.name} sleep start`)
    }
    // 先后顺序插入
    this.tasks.unshift(task)
    return this
  }
  sleepFirst(time) {
    // 延迟time后取出下一个任务执行
    setTimeout(_ => {
      console.log(`${this.name} sleep first end`)
      this.next()
    }, time)
    const task = () => {
      console.log(`${this.name} sleep first start`)
    }
    // 插入队首
    this.tasks.push(task)
    return this
  }
  eat() {
    const task = () => {
      console.log(`${this.name} eat`)
      this.next()
    }
    this.tasks.unshift(task)
    return this
  }
}


const lm = new lazyMan('abiha')
// lm.eat().eat().eat().sleepFirst(1000)



const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5', '4.3.4.5.0']
const versionSort = function (data) {
  const result = data.sort((prev, next) => {
    const p = prev.split('.')
    const n = next.split('.')
    const length = Math.min(p.length, n.length)
    for (let i = 0; i < length; i++) {
      if (p[i] === n[i]) continue
      return p[i] - n[i]
    }
    return p.length - n.length
  })
  console.log(result)
}

// console.log(versionSort(versions))

const coinChange = function (coins = [2, 4], amount = 3) {
  /*
    f(mount) = Math.min(f(amount - 1), f(amount - 2), f(amount - 5)) + 1
    f(0) = 0
  */
  // const f = coins.reduce((prev, coin) => { prev[coin] = 1; return prev }, {})
  const f = Object.create(null)
  const helper = function (amount) {
    if (f[amount]) return f[amount]
    if (amount < 0) {
      f[amount] = Infinity
    }
    if (amount == 0) {
      f[amount] = 0
    }
    if (amount > 0) {
      // f[amount] = Math.min(helper(amount - 1), helper(amount - 2), helper(amount - 5)) + 1
      f[amount] = Math.min(...coins.map(coin => helper(amount - coin))) + 1
    }
    return f[amount]
  }
  helper(amount)

  return f[amount] === Infinity ? -1 : f[amount]
}
coinChange()