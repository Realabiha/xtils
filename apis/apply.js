module.exports = function _bind(func, context = null, ...args){
    context.$func = func
    context.$func(args)
    delete context.$func
}