module.exports = function bigNumberAdd(a, b) {
  // 比较长度而非大小(大数科学计数)
  const maxLen = Math.max(a.length, b.length)
  // 小值补0
  while (a.length > b.length) b = '0' + b
  while (b.length > a.length) a = '0' + a
  // 进位标记
  let mark = 0
  // 结果
  let result = ''
  // 从个位开始相加 迭代结果
  for (let i = maxLen - 1; i >= 0; i--) {
    const sum = a[i] * 1 + b[i] * 1 + mark
    result = sum % 10 + result
    mark = sum >= 10 ? 1 : 0
  }
  // 返回最终结果
  return mark ? mark + result : result
}