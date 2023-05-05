const from = function (arrayLike) {
  if (Array.from) return Array.from(arrayLike)
  return Array.prototype.slice.call(arrayLike)
}