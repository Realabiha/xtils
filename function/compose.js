/*
    组合
    compose(a, b, c, d) --> a(b(c(d)))
*/
module.exports = function compose(...args){
    // 1.for循环迭代
    // let val, i = args.length - 1
    // for(; i >= 0; i--){
    //     if(typeof args[i] === 'function') val = args[i](val)
    //     else val = args[i]
    // }
    // return val
    // 2.reduce
    return args.reverse().reduce((prev, curr, next) => {
        if(typeof prev === 'function') prev = prev()  
        return curr(prev)
    })
}

