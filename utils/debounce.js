/*
    防抖函数
    一段时间内多次触发执行最新触发,清除定时器
*/ 
module.exports = function debounce(handler, delay = 500, immediate = false){
    const that = this
    let timer = null
    return function(...args){
        const later = function(){
            handler.apply(that, args)
            clearTimeout(timer)
            timer = null
        }
        timer && clearTimeout(timer)
        const callNow = !timer && immediate
        debugger
        if(callNow) later()
        timer = setTimeout(later, delay)

    }
}