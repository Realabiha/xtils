const intersection = require('./intersection')
describe('intersection测试', () => {
    test('交集', () => {
        const result = intersection([1, 2, 3, 3], [2, 3, 3, 4, 4], [3, 3, 4, 5])
        expect(result.sort()).toEqual([3])
    })
})