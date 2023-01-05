const _call = require('./call')
describe('call测试', () => {
    test('this绑定', () => {
        const context = {}
        const handler = jest.fn()
        _call(handler, context, 1)
        // 
        expect(handler.mock.calls[0][0]).toBe(1)
        // this指向
        expect(handler.mock.contexts[0]).toBe(context)
    })
})