function sum(a, b, cb){
    setTimeout(() => {
        cb(a + b)
    },1000)
}
sum(123,456,function(result){
    // console.log(result);
})
/* 
    异步调用必须要通过回调函数来返回数据，
        当我们进行一些复杂的调用时，会出现“回调地狱”

    问题：
        异步必须通过回调函数来返回结果，回调函数一多就会很痛苦

    Promise
        -Promise可以帮助我们解决异步中回调函数的问题
        -Promise就是一个用来存储数据的容器
            它拥有着一套特殊的存取数据的方式
                这个方式使得它里面可以存储异步调用的结果
*/

//创建Promise
//创建Promise时，构造函数中需要一个函数作为参数
//Promise构造函数的回调函数，它会在Promise创建时调用，调用时会有两个参数传递进去
const promise = new Promise((resolve,reject) => {   
    /* 
        resolve和reject是两个函数，通过这两个函数可以向Promise中存储数据
        resolve在执行正常时存储数据，reject在执行错误时存储数据
    */
    // resolve("哈哈")
    // reject("哈哈")
    // 通过函数来向Promise中添加数据，好处就是可以用来添加异步调用的数据
    /* setTimeout(() => {
        resolve("哈哈")
    },1000) */
    // resolve("resolve返回的数据")
    reject("reject返回的数据")
})
setTimeout(() => {
    
console.log(promise);
},2000)

/* 
    从Promise中读取数据
        -可以通过Promise的实例方法then来读取Promise中存储的数据
        -then需要两个回调函数作为参数，回调函数用来获取Promise中的数据
            通过resolve存储的数据，会调用第一个函数返回，
                可以在第一个函数中编写处理数据的代码

            通过reject存储的数据，会调用第二个函数返回，
                可以在第二个函数中编写处理异常的代码
*/
promise.then((result) => {
    // console.log("1",result);
}, (reason) => {
    // console.log("2",reason);
})

/* 
    Promise中维护了两个隐藏的属性：
        PromiseResult
            -用来存储数据
        PromiseState
            -记录Promise的状态（三种状态）
                pending      （进行中）
                fulfilled    （完成）通过resolve存储数据
                rejected     （拒绝，出错了）出错了或通过reject存储数据
            -state只能修改一次，修改以后永远不会再变

        流程：
            当Promise创建时，PromiseState初始值为pending
                当通过resolve存储数据时，PromiseState变为 fulfilled （完成）
                    PromiseResult变为存储的数据
                当通过reject存储数据或出错时，PromiseState变为 rejected （拒绝，出错了）
                    PromiseResult变为存储的数据或异常对象

            当我们通过then读取数据时，相当于为Promise设置了回调函数，
                如果PromiseState变为 fulfilled，则调用then的第一个回调函数来返回
                如果PromiseState变为 rejected，则调用then的第二个回调函数来返回
*/
const promise2 = new Promise((resolve,reject) => {
    // resolve("哈哈")
    reject("哈哈")
})
/* 
    catch() 用法和then类似，但是只需要一个回调函数作为参数
        catch() 中的回调函数只会在Promise被拒绝时才调用
        catch() 相当于then(null,reson => {})
        catch() 就是一个专门处理Promise异常的方法

    finally()
        -无论是正常存储数据还是出现异常了，finally总会执行
        -但是finally的回调函数中不会接收到数据
        -finally()通常用来编写一些无论成功与否都要执行的代码
*/
promise2.catch(reason => {
    console.log(reason);
})
promise2.finally(() => {
    console.log("谁也不能阻挡我执行！");
})