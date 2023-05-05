module.exports = function excuteOnce(fn) {
  // 闭包
  let flag = true
  const context = this
  return function (...args) {
    if (!flag) return
    fn.apply(context, args)
    flag = false
  }
}