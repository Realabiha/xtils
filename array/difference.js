// 数组a与b的差集(属于a但不属于b) 
function difference(a, b){
    return a.filter(item => !b.includes(item)).concat(b.filter(item => !a.includes(item)))
}
module.exports = difference