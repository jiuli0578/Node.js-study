const promise = new Promise((resolve,reject) => {
    resolve("每天都要学习！")
})
/* 
    Promise中的
        then(return new Promise())
        catch
            -这两个方法都会返回一个新的Promise，
                Promise中会存储回调函数的返回值
        finally
            -finally的返回值，不会存储到新的Promise中
*/
promise
    .then(result => {
        console.log("回调函数",result);
        return "每天都要进步！"
    })
    .then(result => {
        console.log("第一个then",result);
        return "每天都要开心！"
    })
    .then(result => {
        console.log("第二个then",result);
    })

function sum(a,b){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(a + b)
        },1000)
    })
}
sum(123,456)
    .then(result => result + 7)
    .then(result => result + 8)
    .then(result => console.log(result))

/* 
    对Promise进行链式调用时，后面的方法（then和catch）读取的是上一步的执行结果，
        如果上一步的执行结果不是当前想要的结果，则会跳过当前方法
    当Promise出现异常时，而整个调用链中没有出现catch，则异常会向外抛出
*/
promise
    .then(result => console.log("第一个then",result))
    .catch(result => {
        console.log("异常处理", result);
        return "嘿嘿"
    })
    .then(result => console.log(result))

/* 
    静态方法
        Promise.resolve() 创建一个立即完成的Promise
        Promise.reject() 创建一个立即拒绝的Promise
        Promise.all([...]) 同时返回多个Promise的执行结果
            其中有一个报错，就返回错误
        Promise.allSettled([...]) 同时返回多个Promise的执行结果（无论成功或失败）
        Promise.race([...]) 返回执行最快的Promise（不考虑对错）
        Promise.any([...]) 返回执行最快的完成的Promise
*/
Promise.all([
    sum(123,456),
    sum(5,6),
    sum(7,13)
]).then(result => {
    console.log(result); //[579, 11, 20]
})
/* Promise.all([
    sum(123,456),
    Promise.reject("哈哈"),
    sum(5,6),
    sum(7,13)
]).then(result => {
    console.log(result); //报错
}) */
Promise.allSettled([
    sum(123,456),
    Promise.reject("哈哈"),
    sum(5,6),
    sum(7,13)
]).then(result => {
    console.log(result); //{status: 'fulfilled', value: 579}
                        //{status: 'rejected', reason: '哈哈'}
})
Promise.race([
    Promise.reject("哈哈"),
    sum(123,456),
    sum(5,6),
    sum(7,13)
]).then(result => {
    console.log(result); 
}).catch(result => {
    console.log("错误"); //错误
})
Promise.any([Promise.reject("哈哈"),
    sum(123,456),
    sum(5,6),
    sum(7,13)
]).then(result => {
    console.log(result); //579
}).catch(result => {
    console.log("错误"); 
})