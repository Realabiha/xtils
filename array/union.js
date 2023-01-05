// 数组并集 A∪B
function union(...args){
    // return args.reduce((prev, arg) => prev.concat(arg.filter(item => !prev.includes(item))))
    const result = args[0] || []
    for(let i = args.length - 1; i > 0; i--){
        const arg = args[i]
        for(let j = arg.length - 1; j > -1; j--){
            const item = arg[j]
            !result.includes(item) && result.push(item)
        }
    }
    return result
}
module.exports = union