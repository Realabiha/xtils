const deepClone = require("./deepClone")

describe('deepClone 测试', () => {
  test('', () => {
    const obj = { a: 1, b: [2, 3, 4], c: { d: 5 } }
    obj.e = obj
    const clonedObj = deepClone(obj)
    clonedObj.c.d = 6
    console.log(clonedObj, obj)
  })
})