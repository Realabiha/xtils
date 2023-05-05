/**
 * data
 * {id: '1', value: '1', pid: '0', children: []}
 */
let result = []
let i = 0

// module.exports = 
function treeToList(data) {
  // 递归
  const { id, value, pid, children } = data
  result.push({ id, value, pid })
  if (children?.length) children.forEach(treeToList)
  return result
}

treeToList({ id: '1', children: [{ id: '1-1', children: [{ id: '1-1-1' }, { id: '1-1-2' },] }, { id: '1-2', children: [{ id: '1-2-1' }, { id: '1-2-2' }] }] })
console.log(result, i, 'result===')