const _apply = require('./apply')
describe('apply测试', () => {
    test('this绑定', () => {
        const context = {}
        const handler = jest.fn()
        _apply(handler, context, 1)
        // 第一次调用时第一个形参
        expect(handler.mock.calls[0][0]).toEqual([1])
        // this指向
        expect(handler.mock.contexts[0]).toBe(context)
    })
})