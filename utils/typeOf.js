/*
    数据类型判断 [object Object]
*/ 
module.exports = function typeOf(data){
    return Object.prototype.toString.call(data).slice(8, -1)
}