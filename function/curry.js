/*
    柯里化
    curry(a)(b)(c) --> a(b, c) 
*/ 
module.exports = function curry(func, collect = []){
    // 1.形参收集
    // return function(...args){
    //     // 收集已传入的参数
    //     collect = collect.concat(args)
    //     // 参数全部收集
    //     if(collect.length >= func.length) return func.apply(null, collect)
    //     // 递归收集
    //     return curry(func, collect)
    // }
    // 2.变量收集
    let $collect = []
    const temp = function(){
        return function(...args){
            // 收集已传入的参数
            $collect = $collect.concat(args)
            // 参数全部收集
            if($collect.length >= func.length) return func.apply(null, $collect)
            // 递归收集
            return temp()
        }
    }
    return temp()

}