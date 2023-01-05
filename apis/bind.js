module.exports = function _apply(func, context = null){
    context.$func = func
    return function(...args){
        context.$func(...args)
        delete context.$func
    }
}