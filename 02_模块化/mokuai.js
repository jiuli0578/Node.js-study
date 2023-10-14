/* 
    在定义模块时，模块中的内容默认是不能被外部看到的
        可以通过exports来设置要向外部暴露的内容

    访问exports的方式有两种：
        exports
        module.exports
        -当我们在其它模块中引入模块时，require函数返回的值就是exports
        -可以将希望暴露给外部模块的内容设置为exports的属性
*/
console.log("我是模块js");

//可以通过exports一个一个导出
/* exports.a = '孙悟空'
exports.b = {name:"猪八戒"}
exports.c = function fn(){
    console.log("沙和尚");
} */

//也可以通过module.exports同时导出多个值
module.exports = {
    a: '孙悟空',
    b: {name:"猪八戒"},
    c: () => {
        console.log("沙和尚");
    }
}