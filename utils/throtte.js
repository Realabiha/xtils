/*
    节流函数
    一段时间内多次触发只执行一次,不清除定时器
    handler Function 回调函数
    dealy Number 延迟事件 
    immediate Boolean 首次触发是否立即执行 
*/ 
module.exports = function throtte(handler, delay = 500, immediate = false){
    const that = this
    let timer = null
    return function(...args){
        const later = function(){
            handler.apply(that, args)
            clearTimeout(timer)
            timer = null
        }
        // timer && clearTimeout(timer)
        const callNow = !timer && immediate
        debugger
        if(callNow) later()
        timer = setTimeout(later, delay)

    }
}