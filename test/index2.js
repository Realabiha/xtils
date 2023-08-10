const compose = function (...fns) {
  const that = this
  return function (arg) {
    // console.log(Object.prototype.toString.call(args))
    while (fns.length) {
      const fn = fns.pop()
      arg = fn.call(that, arg)
    }
    // console.log(arg)
    return arg
  }

}
const composeFunc = compose(_ => _ + 1, _ => _ + 2, _ => _ + 3)
composeFunc(4)

const _setInterval = function (cb, delay) {
  const that = this
  const fn = function (...args) {
    cb.apply(that, args)
    setTimeout(fn, delay)
  }
  setTimeout(fn, delay)
}

// _setInterval(_ => console.log(1), 1000)

class pubsub {
  constructor() {
    this.store = Object.create(null)
    this.uid = 0
  }
  emit(type, data) {
    const callbacks = this.store[type]
    callbacks.forEach(_ => callback(data))
  }
  on(type, callback) {
    this.store[type] = this.store[type] || []
    this.store[type].push(callback)
  }
  once(type, callback) {
    const that = this
    const oncecallback = function (...args) {
      callback.apply(that, args)
      this.off(type, oncecallback)
    }
    oncecallback.fn = callback
    this.on(type, oncecallback)
  }
  off(type, callback) {
    const callbacks = this.store[type]
    let i = callbacks.length
    while (i--) {
      const _callback = callbacks[i]
      if (_callback === callback || _callback.fn === callback)
        callbacks.splice(i, 1)
      break
    }
  }
}


const filterArray = function (array) {
  return [...new Set(array)]
}


const flatten = function (array) {
  // 递归
  // return array.reduce((prev, item) => {
  //   if (Array.isArray(item)) {
  //     prev.push(...flatten(item))
  //   } else {
  //     prev.push(item)
  //   }
  //   return prev
  // }, [])
  // 迭代
  while (array.some(item => Array.isArray(item))) {
    array = [].concat(...array)
  }
  return array
}

// console.log(flatten([[1], 2, [3, [4, [5]]]]))

class Schedule {
  constructor(limit) {
    this.tasks = []
    // this.running = 0
    this.limit = limit
  }
  add(request) {
    this.tasks.unshift(request)
  }
  run() {
    for (let i = 0; i < this.limit; i++) {
      this.next().then(this.next)
    }
  }
  next() {
    const request = this.tasks.pop()
    return request()
  }
}

const _inherit = function (Sup) {
  const prototype = Object.create(Sup.prototype)
  const Sub = function (options) {
    Sup.call(this, options)
  }
  Object.setPrototypeOf(Sub.prototype, prototype)
  Sub.prototype.constructor = Sub
  Sub['from'] = Sup
  return Sub
}

const _new = function (constructor, ...args) {
  const context = Object.create(constructor.prototype)
  const result = constructor.apply(context, args)
  return typeof result === 'object' ? result : context
}
const person = function (name) {
  this.name = name || 'abiha'
}
person.prototype.say = function () {
  console.log(this.name)
}

const p = _new(person)
// p.say()


const _instanceof = function (left, right) {
  while (left = left.__proto__) {
    console.log(1)
    if (left === right.prototype) return true
    continue
  }
  return false
}

const _create = function (prototype) {
  const F = function () { }
  F.prototype = prototype
  return new F()
}

// console.log(_instanceof(_ => _, Object))

const _call = function (func, context, ...args) {
  const fn = Symbol()
  context[fn] = func
  context[fn](...args)
}

Function.prototype._call = function (context, ...args) {
  const fn = Symbol()
  context[fn] = this
  context[fn](...args)
}

const _bind = function (func, context, ...args) {
  const result = function (...inner) {
    const fn = Symbol()
    // 作为构造函数调用(不修改this指向)
    if (this instanceof result) {
      this[fn] = func
      this[fn](...args, ...inner)
      return
    }
    // 作为普通函数调用(修改this指向)
    context[fn] = func
    context[fn](...args, ...inner)
  }
  result.prototype = Object.create(func.prototype)
  return result
}

const curry = function (func, c = []) {
  // let i = func.length
  return function (...args) {
    c = c.concat(args)
    if (c.length >= func.length) {
      return func(...c)
    }
    return curry(func, c)
  }
}
const fn = curry((a, b, c) => a + b + c)
// console.log(fn(1, 2)(3))

const bubbleSort = function (array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      const vj = array[j]
      const temp = vjplus1 = array[j + 1]
      if (vj > vjplus1) {
        // array[j + 1] = vj
        // array[j] = temp
        [array[j + 1], array[j]] = [array[j], array[j + 1]]
      }
      continue
    }
  }
  return array
}

// console.log(bubbleSort([9, 1, 3, 2, 5, 4, 7, 6, 8]))

const mergeSort = function (array) {
  let length = array.length
  if (length <= 1) return array
  const mid = array.pop()
  const left = []
  const right = []
  length = array.length
  while (length--) {
    const item = array[length]
    item > mid ? right.push(item) : left.push(item)
  }
  return mergeSort(left).concat(mid).concat(mergeSort(right))
}

// console.log(mergeSort([9, 1, 3, 2, 5, 4, 7, 6, 8]))

const binarySearch = function (target, array, start = 0, end = array.length) {
  const mid = Math.floor((start + end) / 2)
  // console.log(mid, start, end)
  if (array[mid] === target) return mid
  if (start >= end) return -1
  if (array[mid] < target)
    return binarySearch(target, array, mid + 1, end)
  if (array[mid] > target)
    return binarySearch(target, array, start, mid)
}

console.log(binarySearch(2, [0, 1, 3, 4]))


class LazyMan {
  constructor(name) {
    this.name = name
    this.tasks = []
    const task = () => {
      console.log(`this is ${this.name}`)
      this.next()
    }
    this.tasks.unshift(task)
    setTimeout(_ => this.next())
  }
  eat() {
    const task = () => {
      console.log(`${this.name} is eating`)
      this.next()
    }
    this.tasks.unshift(task)
    return this
  }
  next() {
    const task = this.tasks.pop()
    task && task()
  }
  sleep(time) {
    const task = () => {
      console.log(`${this.name} sleep begin`)
      setTimeout(_ => this.next(), time)
    }
    this.tasks.unshift(task)
    return this
  }
}

// const lm = new LazyMan('abiha')
// lm.eat().sleep(2000).eat()

const debounce = function (func, delay = 0, immediate = false) {
  let timer = null
  return (...args) => {
    const later = _ => {
      func(args)
      timer = null
    }
    if (timer) clearTimeout(timer)
    const callNow = immediate && !timer
    if (callNow) later(args)
    timer = setTimeout(later, delay)
  }
}

const throtte = function (func, delay = 0, immediate = false) {
  let timer = null
  return (...args) => {
    const later = _ => {
      func(args)
      timer = null
    }
    const callNow = immediate && !timer
    if (callNow) later(args)
    timer = setTimeout(later, delay)
  }
}

const versionSort = function (versions) {
  return versionSort.sort((prev, next) => {
    const pl = prev.length
    const nl = next.length
    const min = Math.min(prev.length, next.length)
    for (let i = 0; i < min; i++) {
      const pi = prev[i]
      const ni = next[i]
      if (pi === ni) continue
      return pi - ni
    }
    return pl - nl
  })
}

const loopRender = function (total = 103, piece = 10) {
  let rendered = 0
  const inner = function () {
    const min = Math.min(total - rendered, piece)
    for (let i = 0; i < min; i++) {
      rendered++
    }
    console.log(rendered)
    if (rendered < total) {
      setTimeout(inner)
    }
  }
  inner()

}
// loopRender()

class LRU {
  constructor(max) {
    this.max = max
    this.list = []
  }
  get(key) {
    if (!key) return this.list.pop()
    const index = this.list.indexOf(item => item.key === key)
    if (index === -1) return
    const target = this.list.splice(index, 1)
    this.list.push(target)
    return target
  }
  set(key, value) {
    const index = this.list.indexOf(item => item.key === key)
    if (index >= 0) {
      this.list.splice(index, 1, { key, value })
      return
    }

    if (this.list.length < this.max) {
      this.list.push({ key, value })
      return
    }
    this.list.shift()
    this.list.push({ key, value })

  }
}

/*
1.异常捕获
2.then方法回调异步执行，then方法支持链式调用
3.三个状态成功、失败、等待，初始为等待，状态改变后不可修改
*/
class Promise {
  constructor(excutor) {
    const resolve = value => {
      if (this.state !== '0') return
      this.state = '1'
      this.value = value
      this.resolveCallbacks.forEach(cb => cb(value))
    }
    const reject = reason => {
      if (this.state !== '0') return
      this.state = '-1'
      this.value = reason
      this.rejectCallbacks.forEach(cb => cb(reason))
    }

    this.state = '0'
    this.value
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    try {
      excutor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  then(onResolve, onReject) {
    const that = this
    return new Promise((resolve, reject) => {
      // 异步修改状态
      if (that.state === '0') {
        this.resolveCallbacks.push(value => {
          setTimeout(_ => {
            try {
              const result = onResolve(value)
              if (result instanceof Promise) {
                result.then(value => resolve(value), reason => reject(reason))
                return
              }
              resolve(result)
            } catch (error) {
              reject(error)
            }
          })
        })
        that.rejectCallbacks.push(reason => {
          setTimeout(_ => {
            try {
              const result = onReject(reason)
              if (result instanceof Promise) {
                result.then(value => resolve(value), reason => reject(reason))
                return
              }
              resolve(reason)
            } catch (error) {
              reject(error)
            }
          })
        })
        return
      }
      // 同步修改状态
      if (that.state === '1') {
        setTimeout(_ => {
          try {
            const result = onResolve(that.value)
            if (result instanceof Promise) {
              result.then(value => resolve(value), reason => reject(reason))
              return
            }
            resolve(result)
          } catch (error) {
            reject(error)
          }
        })
        return
      }
      if (that.state === '-1') {
        setTimeout(_ => {
          try {
            const result = onReject(that.value)
            if (result instanceof Promise) {
              result.then(value => resolve(value), reason => reject(reason))
              return
            }
            resolve(result)
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }
  all(promises) {
    const length = promises.length
    const result = []
    let count = 0
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        p.then(value => {
          result[index] = value
          count++
          if (count >= length) resolve(result)
        }, reason => {
          reject(reason)
        })
      })
    })
  }
  race(promises) {
    const length = promises.length
    const result = []
    let count = 0
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        p.then(value => {
          resolve(value)
        }, reason => {
          result[index] = reason
          count++
          if (count >= length) reject(result)
        })
      })
    })
  }
}


const coinChange = function (coins, amount) {
  /*
    [1,2,5] 11
    f(11) = Math.min(f(11-1), f(11-2), f(11-5)) + 1
  */
  const f = coins.reduce((prev, coin) => { prev[coin] = 1; return prev }, Object.create(null))
  const inner = function (amount) {
    if (f[amount]) return f[amount]
    if (amount <= 0) {
      f[amount] = Infinity
      return f[amount]
    }
    f[amount] = Math.min(...coins.map(coin => inner(amount - coin))) + 1
    return f[amount]
  }
  inner(amount)
  return f[amount] === Infinity ? -1 : f[amount]
}

// console.log(coinChange([1, 2, 5], 67))


const domToJson = function (dom) {
  // children 元素节点 childNodes node节点
  const children = dom.children
  const tag = dom.tagName
  const node = { tag, children: [] }
  // children.forEach(child => {
  //   node.children.push(domToJson(child))
  // })
  for (let child of children) {
    node.children.push(domToJson(child))
  }
  return node
}
// console.log(domToJson(document.body))

const ajax = function (config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(config.method, config.url)
    xhr.onreadystatechange = function () {
      if (xhr.readstate !== 4) {
        reject(xhr.readyState)
        return
      }
      if (xhr.status === 200) {
        resolve(xhr.response)
        return
      }
      reject(xhr.status)
    }
    xhr.send(config.data)
  })
}
/*
   {
        tag: 'DIV',
        attrs: {
          id: 'app'
        },
        children: [
          {
            tag: 'SPAN',
            children: [
              { tag: 'A', children: [] }
            ]
          },
          {
            tag: 'SPAN',
            children: [
              { tag: 'A', children: [] },
              { tag: 'A', children: [] }
            ]
          }
        ]
      }
*/
const jsonToDom = function (json) {
  const { tag, attrs = {}, children = [] } = json
  const dom = document.createElement(tag)
  Object.entries(attrs).reduce((prev, [attr, val]) => {
    dom.setAttribute(attr, val)
    return dom
  }, dom)
  children.forEach(child => {
    dom.appendChild(jsonToDom(child))
  })
  return dom
}

const arrayFrom = function (data) {
  return Array.from(data)
  return [...data]
  return Array.prototype.slice.call(data)
}

const objectIs = function (left, right) {
  if (left === right) {
    // 0、-0 
    return left !== 0 || 1 / left === 1 / right
  }
  // NaN
  return left !== right && right !== left
}

/*
  {
    a: 1,
    b: 
    {
      c: 
      [
        2, 
        {
          d: 3
        }
      ]
    }
  }
  {
    a: 1, 
    b.c[0]: 2, 
    b.c[1].d: 3
  }
*/
const objectFlatten = function (data) {
  const result = Object.create(null)
  const dfs = (data, prefix = '') => {
    // if (typeof data === 'object') {
    //   Object.entries(data).forEach(([key, value]) => {
    //     dfs(value, `${prefix}${key}`)
    //   })
    // } else {
    //   result[prefix] = data
    // }
    Object.entries(data).forEach(([key, value]) => {
      prefix += key
      if (typeof value === 'object') {
        dfs(value, prefix)
      } else {
        result[prefix] = value
      }
    })
  }
  dfs(data)
  return result
}

// console.log(objectFlatten({ a: 1, b: [2, { c: 3 }] }))


/*
[
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
]
*/
const listToTree = function (list) {
  return list.reduce((prev, item) => {
    const data = { ...item, children: [] }
    prev.set(id, data)
    const parent = prev.get(parentId)
    parent && parent.children.push(data)
    return prev
  }, new Map())
}
// console.log(listToTree([{
//   id: 1,
//   text: '节点1',
//   parentId: 0
// },
// {
//   id: 2,
//   text: '节点1_1',
//   parentId: 1
// }]))


/*
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
*/
const treeToList = function (tree, result = []) {
  const { id, text, parentId, children } = tree
  result.push({ id, text, parentId })
  if (children?.length) {
    children.forEach(item => treeToList(item, result))
  }
  return result
}

// console.log(treeToList({
//   id: 1,
//   text: '节点1',
//   parentId: 0,
//   children: [
//     {
//       id: 2,
//       text: '节点1_1',
//       parentId: 1
//     }
//   ]
// }))

const bigNumAdd = function (a, b) {
  console.log(a * 1 + b * 1)
  let i = a.length - 1
  let j = b.length - 1
  let current = 0
  let result = ''
  while (i >= 0 || j >= 0) {
    const vi = i >= 0 ? a[i] * 1 : 0
    const vj = j >= 0 ? b[j] * 1 : 0

    let sum = vi + vj + current
    current = 0
    if (sum >= 10) {
      current = 1
      sum = sum - 10
    }
    result = sum + result
    i--
    j--
  }
  return current > 0 ? current + result : result
}
// console.log(bigNumAdd('123405', '9876543210'))

const missingNum = function (array) {
  let left = 0, right = array.length
  const inner = function (left, right) {
    const mid = Math.floor((left + right) / 2)
    const value = array[mid]

    // 左边
    if (value > mid) {
      right = mid
      // 右边
    } else if (value === mid) {
      left = mid + 1
    }
    // 不会出现value<mid
    console.log(left, right, mid, value)

    // 递归结束
    if (left < right) {
      return inner(left, right)
    }
    return right
  }
  return inner(left, right)
}

// console.log(missingNum([0, 1, 2]))

