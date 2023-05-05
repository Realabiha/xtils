function spliceUpdate(data, selector, piece = 10) {
  const container = document.querySelector(selector)
  const index = 0
  const loop = function (data, index) {
    const list = Math.min(data, piece)
    if (list <= 0) return
    requestAnimationFrame(_ => {
      for (let i = 0; i < list; i++) {
        const h1 = document.createElement('h1')
        h1.innerText = index + i
        console.log(index)
        container.appendChild(h1)
      }
      loop(data - list, index + list)
    })
  }
  loop(data, index)
}

spliceUpdate(100000000000000000, '#app')