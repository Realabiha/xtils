const typeOf = require('./typeOf')
describe('typeOf测试', () => {
    test('Array', () => {
        expect(typeOf([])).toBe('Array')
    })
})