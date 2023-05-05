const bigNumberAdd = require('./bigNumberAdd')
describe('大数相加测试', () => {
  test('相加结果', () => {
    expect(bigNumberAdd('11111111111111111111', '11111111111111111111111111')).toBe('11111122222222222222222222')
  })
})