/* 
    nodejs文档：
        http://nodejs.dev/en/
*/
function fn1(){
    return Promise.resolve(10)
}
/* 
    通过async可以快速的创建一个异步函数
        异步函数的返回值会自动封装到一个Promise中返回
*/
async function fn2(){
    return 10
}

/* fn1().then((result) => {
    console.log(result);
})
fn2().then((result) => {
    console.log(result);
}) */

function sum(a,b){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(a + b)
        },1000)
    })
}
/* 
    当我们通过await去调用异步函数时，它会暂停代码的运行，
        直到异步代码执行有结果，才会将结果返回
    注意：
        await只能用于async声明的异步函数中，或es模块的顶级作用域中
        await阻塞的只是异步函数中的代码，不会影响外部代码
    通过await调用异步代码时，需要通过try-catch来处理异常
*/
async function fn3(){
    try{
        let result = await sum(123,456)
        result = await sum(result,8)
        result = await sum(result,9)
        console.log(result);
    }catch(e){
        console.log("出错了~~");
    }
    
}
fn3()

//如果async声明的函数中没有写await，那么它里面会依次执行（和普通函数没差别）
async function fn4(){
    console.log(1);
    console.log(2);
    console.log(3);
}
fn4()
console.log(4); //1 2 3 4

/* 
    当我们使用await调用函数后，当前函数后面的所有代码
        会在当前函数执行完毕后，被放到微任务队列中
*/
async function fn5(){
    console.log(1);
    await console.log(2);
    console.log(3);
}
fn5()
console.log(4); //1 2 4 3
