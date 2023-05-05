const excuteOnce = require('./excuteOnce')
describe('函数执行一次测试', () => {
  test('执行一次', () => {
    const fn = jest.fn()
    const onceFn = excuteOnce(fn)
    onceFn([1, 2, 3])
    onceFn([1, 2])
    onceFn([1])
    expect(fn).toBeCalledTimes(1)
    expect(fn.mock.calls[0][0]).toEqual([1, 2, 3])
    // expect(fn.mock.contexts[0]).toBe(context)
  })
})