/*
    Promise
    new Promise(excutor).then(res => {}, rej => {})
*/
// module.exports = class Promise{
//     constructor(excutor){
//         const resolve = (value) => {
//             this.state = 1
//             this.value = value
//             this.callbacks.forEach(({onResolve}) => {onResolve(this.value)})
//         }
//         const reject = (error) => {
//             this.state = -1
//             this.value = error
//             this.callbacks.forEach(({onReject}) => {onReject(this.value)})
//         }
//         this.state = 0
//         this.value
//         this.callbacks = []
//         try {
//             excutor.call(this, resolve, reject)
//         } catch (error) {
//             reject(error)
//         }
//     }
//     then(onResolve, onReject){
//         const that = this
//         return new Promise(function(resolve, reject){
//             const enqueue = function(onHandler){
//                 setTimeout(_ => {
//                     try {
//                         const result = onHandler(that.value)
//                         if(result instanceof Promise){
//                             return result.then(res => resolve(res), rej => reject(rej))
//                         }
//                         resolve(result)
//                     } catch (error) {
//                         reject(error)
//                     }
//                 })
//             }


//             // 1.handler
//             // 2.enqueue the handler

//             const enqueueHandler = function(){
//                 return function(handler){
//                     return enqueue(handler)
//                 }
//             }


//             const switchState = {
//                 '1': _ => enqueue(onResolve),
//                 '-1': _ => enqueue(onReject),
//                 '0': _ => that.callbacks.push({onResolve: _ => enqueue(onResolve), onReject: _ => enqueue(onReject)})
//             }
//             switchState[that.state]()
//         })
//     }
// }


const _Promise = function (excutor) {
    this.state = 0
    this.value = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    const resolve = (value) => {
        this.state = 1
        this.value = value
        this.resolveCallbacks.forEach(cb => cb())
    }
    const reject = (reason) => {
        this.state = -1
        this.value = reason
        this.rejectCallbacks.forEach(cb => cb())
    }
    try {
        excutor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}
_Promise.resolve = function (value) {
    return new _Promise((resolve) => {
        resolve(value)
    })
}
_Promise.reject = function (reason) {
    return new _Promise((_, reject) => {
        reject(reason)
    })
}
_Promise.prototype.then = function (onResolve = _ => _, onReject = _ => _) {
    const that = this
    return new _Promise((resolve, reject) => {
        const enqueue = function (handler) {
            setTimeout(_ => {
                try {
                    const result = handler(that.value)
                    if (result instanceof _Promise) return result.then(res => res, rej => rej)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        }
        if (that.state === 0) {
            // that.resolveCallbacks.unshift(onResolve)
            // that.rejectCallbacks.unshift(onReject)
            that.resolveCallbacks.unshift(_ => enqueue(onResolve))
            that.rejectCallbacks.unshift(_ => enqueue(onReject))
            return
        }
        if (that.state === 1) {
            // onResolve(that.value)
            enqueue(onResolve)
            return
        }
        if (that.state === -1) {
            // onReject(that.value)
            enqueue(onReject)
        }
    })



}
_Promise.prototype.finally = function (onHandler) {
    return this.then(onHandler, onHandler)
}
// 全部resolve
_Promise.prototype.all = function (promises) {
    return new _Promise((resolve, reject) => {
        const length = promises.length
        const result = []
        for (let promise of promises) {
            if (!(promise instanceof _Promise)) promise = _Promise.resolve(promise)
            promise.then(res => {
                result.push(res)
                if (result.length === length) { resolve(result) }
            }, rej => {
                result.push(rej)
                reject(result)
            })
        }
    })
}
// 全部resolve或reject
_Promise.prototype.allSettled = function (promises) {
    return new _Promise((resolve, reject) => {
        const length = promises.length
        const result = []
        for (let promise of promises) {
            if (!(promise instanceof _Promise)) promise = _Promise.resolve(promise)
            promise.finally(res => {
                result.push(res)
                if (result.length === length) resolve(result)
            })
        }
    })
}
// 状态最先resolve或reject
_Promise.prototype.race = function (promises) {
    return new _Promise((resolve) => {
        for (let promise of promises) {
            if (!(promise instanceof _Promise)) promise = _Promise.resolve(promise)
            promise.finally(resolve)
        }
    })
}
// 任意一个resolve
_Promise.prototype.any = function (promises) {
    return new _Promise((resolve, reject) => {
        const result = []
        if (!(promise instanceof _Promise)) promise = _Promise.resolve(promise)
        for (let promise of promises) {
            promise.then(resolve, rej => {
                result.push(rej)
                if (result.length === length) reject(result)
            })
        }
    })
}


const p = new _Promise((resolve, reject) => {
    console.log(111)
    // setTimeout(_ => resolve(123))
    resolve(123)
})
p.then(res => console.log(res, '1'))
p.then(res => console.log(res, '2'))
p.then(res => console.log(res, '3'))
p.then(res => console.log(res, '4'))
_Promise.resolve(234).then(res => console.log(res))
_Promise.reject(345).then(res => console.log(res), rej => console.log(rej))
console.log(222)


