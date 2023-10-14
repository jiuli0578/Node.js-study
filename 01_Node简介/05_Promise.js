/* 
    设置一个定时器
        定时器的作用是间隔一段时间后，将函数放入任务队列中
*/
setTimeout(() => {
    console.log(3);
}, 0);

/* 
    Promise的执行过程
        -Promise在执行时，then就相当于给Promise定义了一个回调函数
            当Promise的状态从pending变为fulfilled时，
                then的回调函数就会放到消息队列中    
*/
Promise.resolve(1).then(() => {
    console.log(2);
})

console.log(1);
/* 
    JS是单线程的，它的运行是基于事件循环机制（event loop）
        -调用栈
            -栈
                栈是一种数据结构，后进先出/先进后出
            -调用栈中，存放的是要执行的代码
        -任务队列
            -队列
                队列是一种数据结构，先进先出
            -任务队列中存放的是要执行的代码
            -当调用栈中的代码执行完毕后，队列中的代码才会按照顺序进入调用栈中执行
            -在JS中任务队列有两种
                -宏任务队列（大部分代码都去宏任务队列中排队）
                -微任务队列（Promise的回调函数（then，catch，finally）去微任务队列排队）
    
        -整个流程
            ① 执行调用栈中的代码
            ② 执行微任务队列中的所有任务
            ③ 执行宏任务队列中的所有任务
*/

/* 
    queneMicrotask() 用来向微任务队列中添加一个任务
*/
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);
// 输出结果：1735264