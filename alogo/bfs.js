const nodes = { value: '0', children: [{ value: '1', children: [{ value: '3' }] }, { value: 2 }] }
/*
    0
  1   2
3
*/

// 0 1 2 3
const queue = []
const bfs = function (nodes) {
  queue.push(nodes)
  while (queue.length) {
    const task = queue.shift()
    const { value, children } = task
    console.log(value)
    if (children) children.forEach(child => { queue.push(child) })
  }
}
bfs(nodes)
