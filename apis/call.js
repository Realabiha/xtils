/*
    func.call(context, a, b, c)
*/ 
module.exports = function _call(func, context = null, ...args){
    context.$func = func
    context.$func(...args)
    delete context.$func
}