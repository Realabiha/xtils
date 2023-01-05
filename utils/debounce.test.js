const debounce = require('./debounce')
describe('防抖测试', () => {
    test('回调执行次数', () => {
        const handler = jest.fn()
        debounce(handler, 500, true)(1)
        debounce(handler, 500, false)(2)
        debounce(handler, 500, false)(3)
        expect(handler.mock.calls.length).toBe(1)
        expect(handler.mock.calls[0][0]).toBe(1)
    })
    test('回调执行次数', () => {
        const handler = jest.fn()
        debounce(handler, 500, false)(1)
        debounce(handler, 500, false)(2)
        debounce(handler, 500, false)(3)
        expect(handler.mock.calls.length).toBe(0)
    })
})