let microFunc, macroFunc, useMacro = false

if (typeof Promise === 'function') {
  microFunc = function (cb, ctx) {
    const promise = Promise.resolve(ctx)
    promise.then(cb)
  }
} else if (typeof setImmediate === 'function') {
  macroFunc = function (cb, ctx) {
    macroFunc = setImmediate(cb.bind(ctx))
  }
  useMacro = true
}

const callbacks = []

const flushCallbacks = function (cbs) {
  callbacks.forEach(cb)
}

const nextTick = function (cb, ctx) {
  callbacks.push(cb)
  if (useMacro) {
    macroFunc(flushCallbacks, ctx)
    return
  }
  microFunc(flushCallbacks, ctx)
}