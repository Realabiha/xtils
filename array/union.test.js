const union = require('./union')
describe('union测试', () => {
    test('并集', () => {
        const result = union([1, 2], [2, 3], [3, 4])
        expect(result.sort()).toEqual([1, 2, 3, 4])
    })
})