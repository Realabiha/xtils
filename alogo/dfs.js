const nodes = { value: '0', children: [{ value: '1', children: [{ value: '3' }] }, { value: 2 }] }
/*
    0
  1   2
3
*/

// 0 1 3 2
const stack = []
const dfs = function (nodes) {
  const { value, children } = nodes
  console.log(value)
  if (children) children.forEach(dfs)
}
dfs(nodes)
