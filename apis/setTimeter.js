// setIntervel 模拟 setTimeout
function setTimeter(fn, delay) {
  const timer = setInterval(() => {
    clearInterval(timer)
    fn()
  }, delay)
}
module.exports = setTimeter
