const swap = function (j, data) {
  const temp = data[j]
  if (data[j] >= data[j + 1]) {
    data[j] = data[j + 1]
    data[j + 1] = temp
    return
  }
}
const sort = function (data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1; j++) {
      swap(j, data)
    }
  }
  return data
}

const mergeSort = function (data) {
  if (data.length <= 1) return data
  const left = []
  const right = []
  const middle = data[0]
  for (let i = 1; i < data.length; i++) {
    const item = data[i]
    if (item >= middle) right.push(item)
    else left.push(item)
  }
  return mergeSort(left).concat([middle]).concat(mergeSort(right))
}

module.exports = mergeSort