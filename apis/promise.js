/*
    Promise
    new Promise(excutor).then(res => {}, rej => {})
*/
module.exports = class Promise{
    constructor(excutor){
        const resolve = (value) => {
            this.state = 1
            this.value = value
            this.callbacks.forEach(({onResolve}) => {onResolve(this.value)})
        }
        const reject = (error) => {
            this.state = -1
            this.value = error
            this.callbacks.forEach(({onReject}) => {onReject(this.value)})
        }
        this.state = 0
        this.value
        this.callbacks = []
        try {
            excutor.call(this, resolve, reject)
        } catch (error) {
            reject(error)            
        }
    }
    then(onResolve, onReject){
        const that = this
        return new Promise(function(resolve, reject){
            const enqueue = function(onHandler){
                setTimeout(_ => {
                    try {
                        const result = onHandler(that.value)
                        if(result instanceof Promise){
                            return result.then(res => resolve(res), rej => reject(rej))
                        }
                        resolve(result)
                    } catch (error) {
                        reject(error)                        
                    }
                })
            }


            // 1.handler
            // 2.enqueue the handler

            const enqueueHandler = function(){
                return function(handler){
                    return enqueue(handler)
                }
            }


            const switchState = {
                '1': _ => enqueue(onResolve),
                '-1': _ => enqueue(onReject),
                '0': _ => that.callbacks.push({onResolve: _ => enqueue(onResolve), onReject: _ => enqueue(onReject)})
            }   
            switchState[that.state]()
        })
    }
}