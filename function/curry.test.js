const curry = require('./curry')
function add(a, b, c){
    return a + b + c
}
describe('函数式编程：柯里化', () => {
    test('curry(add)(1)(2, 3)返回值', () => {
        expect(curry(add)(1)(2, 3)).toBe(add(1, 2, 3))
    })
    test('curry(add)(1)(2)(3)返回值', () => {
        expect(curry(add)(1)(2)(3)).toBe(add(1, 2, 3))
    })
})