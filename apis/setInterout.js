// setTimeout 模拟 setInterval
function setInterout(fn, delay) {
  let timer = null
  const begin = function () {
    timer = setTimeout(() => {
      fn()
      begin()
    }, delay)
  }
  begin()
  return () => clearTimeout(timer)
}
module.exports = setInterout
