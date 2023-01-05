// 数组交集 A ∩ B
function intersection(...args){
    // return [...new Set(args.reduce((prev, arg) => prev.filter(item => arg.includes(item))))]
    let temp = args[0] || []
    for(let i = args.length - 1; i > 0; i--){
        const arg = args[i]
        const result = []
        for(let j = arg.length - 1; j > -1 ; j--){
            const item = arg[j]
            if(temp.includes(item)){
                // !result.includes(item) && 
                result.push(item)
            }
        }
        temp = result
    }
    return [...new Set(temp)]
    // return temp
}
module.exports = intersection