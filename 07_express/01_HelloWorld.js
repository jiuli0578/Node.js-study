/* 
    express 是node中的服务器软件
        通过express可以快速地在node中搭建一个web服务器
    -使用步骤：
        1.创建并初始化项目
            yarn init -y
                如果报错，则管理员运行命令控制台输入 set-ExecutionPolicy RemoteSigned
        2.安装express
            yarn add express
        3.创建index.js 并编写代码
*/

//引入express
const express = require("express")

//获取服务器的实例（对象）
const app = express()

/* 
    app.listen(端口号)  用来启动服务器
        服务器启动后，我们便可以通过端口号来访问
        协议名：http//ip地址:端口号/路径
        http//localhost:3000 <==> http//127.0.0.1:3000
*/
app.listen(3000,() => {
    console.log("服务器已启动");
})

/* 
    中间件
        -在express我们使用app.use来定义一个中间件
            中间件作用和路由很像，用法也很像
                但是路由不区分请求的方式，只看路径

        -和路由的区别
            1.会匹配所有请求
            2.路径设置父目录
*/
app.use((req,res,next) => {
    console.log(111,Date.now());
    // res.send("<h1>111</h1>")
    next()
})
app.use((req,res,next) => {
    console.log(222,Date.now());
    // res.send("<h1>222</h1>")
    next()
})
app.use((req,res,next) => {
    console.log(333,Date.now());
    res.send("<h1>333</h1>")
})

/* 
    如果希望服务器可以正常访问，则需要为服务器设置路由
        路由可以根据不同的请求方式和请求地址来处理用户的需求
            app.METHOD(...) METHOD 可以是 get 或 post
        路由的回调函数执行时，会接收到三个参数
            第一个request，可简写成req
            第二个response，可简写成res
            第三个next(), 它是一个函数，调用函数后，可以出发后续的中间件
                next() 不能在响应处理完毕后调用
*/

app.get("/",(req,res) => {
    console.log("有人访问了");
    /* 
        在路由中，应该做两件事：
            读取用户的请求（request）
                req表示的是用户的请求信息，通过req可以获取用户传递的数据
            根据用户的请求返回响应（response）
                res表示服务器发送给客户端的响应信息，可以通过res来向客户端返回数据
    */
    console.log(req);

    //res.sendStatus(404) 向客户端发送响应状态码
    // res.sendStatus(404)

    //res.status() 用来设置响应状态码，但是并不发送
    // res.status(404)
    res.send("这是我的第一个服务器")
})