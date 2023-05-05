const sort = require('./sort')
describe('sort排序测试', () => {
  test('升序', () => {
    const arr = [2, 4, 1, 5, 7, 3]
    console.log(sort(arr))
  })
})