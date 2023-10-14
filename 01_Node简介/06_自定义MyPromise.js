/* 
    定义类的思路
        1.先把功能都分析清楚，再去写
        2.写一点想一点，走一步看一步

*/
const PROMISE_STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}
class MyPromise{

    //创建一个变量用来存储Promise的结果
    #result
    //创建一个变量用来记录Promise的状态
    #state = PROMISE_STATE.PENDING  //pending 0 fulfilled 1 rejected 2
    //创建一个变量来存储回调函数
    //由于回调函数可能有多个，所有使用数组来存储回调函数
    #callbacks = []
    constructor(executor){
        //接收一个执行器作为参数
        executor(this.#resolve.bind(this),this.#reject.bind(this))    //调用回调函数

    }
    //私有的resolve() 用来存储成功的数据
    #resolve(value){//是放在原型里
        /* 
            禁止值被重复修改，
                如果state不等于0，说明值已经被修改，函数直接返回
        */
        if(this.#state !== PROMISE_STATE.PENDING) return
        this.#result = value
        this.#state = PROMISE_STATE.FULFILLED //数据填充成功
        //当resolve执行时，说明数据已经进来了，需要调用then的回调函数
        //调用callbacks里所有函数
        this.#callbacks.forEach(cb => {
            cb()
        })
    }
    /* 
    #resolve = () => {  //是放在对象自身里，在实例当中

    } */
    //私有的reject() 用来存储拒绝的数据
    #reject(reason){
        this.#result = reason
    }
    //添加一个用来读取数据的then方法
    then(onFulfilled,onRejected){
        return new MyPromise((resolve,reject) => {
            if(this.#state === PROMISE_STATE.PENDING){
                //进入判断说明数据还没有进入Promise，将回调函数设置为callback的值
                this.#callbacks.push(() => {
                    resolve(onFulfilled(this.#result))
                    
                }) 
            }else if(this.#state === PROMISE_STATE.FULFILLED){
                /* 
                    then的回调函数，应该放到微任务队列中执行，而不是直接调用
                */
                queueMicrotask(() => {
                    resolve(onFulfilled(this.#result))
                })
            } 
        })
        
    }

}

const mp = new MyPromise((resolve,reject) => {
    setTimeout(() => {
        resolve("孙悟空")
    },1000)
    
})
mp.then((result) => {
    console.log(result);
})