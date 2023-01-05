const throtte = require('./throtte')
describe('节流测试', () => {
    test('回调执行次数', () => {
        const handler = jest.fn()
        throtte(handler, 500, true)()
        throtte(handler, 500, true)()
        throtte(handler, 500, true)()
        expect(handler.mock.calls.length).toBe(3)
    })
    test('回调执行次数', () => {
        const handler = jest.fn()
        throtte(handler, 500, false)()
        throtte(handler, 500, false)()
        throtte(handler, 500, false)()
        expect(handler.mock.calls.length).toBe(0)
    })
})