const Promise = require('./promise')
describe('Promise api', () => {
    test('实例化并同步修改状态', () => {
        const excutor = jest.fn(function(resolve, reject){resolve(1)})
        const onHandler = jest.fn(function(value){console.log(value, 'value')})
        const promise = new Promise(excutor)
        promise.then(onHandler)
        expect(promise instanceof Promise).toBeTruthy()
        expect(excutor.mock.calls.length).toBe(1)
        expect(promise.state).toBe(1)
    })
})