//引入express
const express = require("express")
const path = require("path")
//创建服务器的实例（对象）
const app = express()

/* 
    安装一个模块 nodemon，实现自动启用服务器
        1.全局安装
            npm i modemon -g
            yarn global add nodemon
                -用yarn进行全局安装时，默认yarn的目录并不在环境变量中，
                    需要手动将路径添加到环境变量中
            -启动：
                nodemon     //运行index.js
                nodemon xxx     //运行指定的js
        2.在项目中安装
            npm i nodemon -D
            yarn add nodemon -D

            -启动：
                npx nodemon
                还可以在json文件中新建scripts，在里面写启动方式
                    然后yarn start 运行
*/

/* 
    服务器中的代码，对于外部来说都是不可见的
        所以写的html界面浏览器无法直接访问
            如果想要访问，则需要将页面所在目录设置为静态资源的目录
*/

/* 
    设置 static中间件后，浏览器访问时，
        会自动去public目录寻找
*/
app.use(express.static(path.resolve(__dirname,"./public")))

//配置路由
app.get("/",(req,res) => {
    res.send("这是hello路由!!!")
})

app.get("/login",(req,res) => {
    console.log("请求已经收到");
    /* 
        获取用户输入的用户名和密码
            req.query 表示查询字符串中的请求参数
                req.query.username  用户名
                req.query.password  密码
    */
    if(req.query.username === "admin" && 
    req.query.password === "123123"){
        res.send("<h1>登陆成功！</h1>")
    }else{
        res.send("<h1>登陆失败！</h1>")
    }
})
//启动服务器
app.listen(3000,() => {
    console.log("服务器已启动");
})