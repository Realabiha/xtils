/*
  [{id: '1', pid: '0'}, {id: '2', pid: '1'}, {id: '3', pid: '1'}]
*/
let store = {}
const data = [{ id: '1', pid: '0' }, { id: '2', pid: '1' }, { id: '3', pid: '1' }]
function listToTree(data) {
  data.forEach((item) => {
    store[item.pid] = store[item.pid] || []
    store[item.pid].push(item)
  })
  data.forEach((item) => {
    item.children = store[item.id] || []
  })
}

const result = listToTree(data)
console.log(store)