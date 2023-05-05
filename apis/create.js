const create = function (prototype) {
  const F = function () { }
  F.prototype = prototype
  return new F()
}