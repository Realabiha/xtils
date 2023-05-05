const setTimeter = require('./setTimeter')
describe('setTimeter测试', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setInterval')
    test('fn回调执行', () => {
        const fn = jest.fn()
        setTimeter(fn, 1000)
        expect(setInterval).toHaveBeenCalledTimes(1)
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000)
        // expect(fn).toHaveBeenCalledTimes(1)
    })
})