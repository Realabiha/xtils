const difference = require('./difference')
describe('difference测试', () => {
    test('差集', () => {
        const result = difference([1, 2], [2, 3, 4])
        expect(result.sort()).toEqual([1, 3, 4])
    })
})