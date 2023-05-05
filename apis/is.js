/*
  +0 -0 不相等
  NaN NaN 相等
  ===
*/
function objectIs(a, b) {
  // 0 、-0
  if (a === b) {
    return a !== 0 || 1 / x === 1 / y
  }
  // NaN
  return a !== b && b !== a
}
