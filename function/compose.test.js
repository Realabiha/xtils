const compose = require('./compose')
function a(n = 0){
    return 1 + n
}
function b(n = 0){
    return 2 + n
}
function c(n = 0){
    return 3 + n
}
describe('函数值编程：组合', () => {
    test('compose(a, b, c, 4)返回值', () => {
        expect(compose(a, b, c, 4)).toBe(10)
    })
    test('compose(a, b, c)返回值', () => {
        expect(compose(a, b, c)).toBe(6)
    })
})