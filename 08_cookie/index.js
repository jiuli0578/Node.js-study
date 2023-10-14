const express = require("express")
const path = require("path")

const app = express()
const cookieParser = require("cookie-parser")
//将ejs设置为默认的模板引擎
app.set("view engine","ejs")
//配置模板路径
app.set("views",path.resolve(__dirname,"views"))

app.use(cookieParser())
//配置静态资源路径
app.use(express.static(path.resolve(__dirname,"public")))
//配置请求体解析
app.use(express.urlencoded({ extended: true }))

app.get("/",(req,res) => {
    res.render("login")
})

app.get("/get-cookie",(req,res) => {
    //给客户端发送一个cookie
    res.cookie("username","admin")
    res.send("cookie已经发送")
})

app.get("/hello",(req,res) => {
    /* 
        需要安装中间件来使得express可以解析cookie
            1.安装cookie-parser
                yarn add cookie-parser
            2.引入
                const cookieParser = require("cookie-parser")
            3.设置为中间件
                app.use(cookieParser())
    */
   //req.cookies 用来读取客户端发回的cookie
   res.send("hello路由")
})
//登录的路由
app.post("/login",(req,res) => {


    //获取用户名和密码
    const {username, password} = req.body
    if(username === "admin" && password === "123123"){
        res.cookie("username",username)
        res.redirect("/students/list")
    }else{
        res.send("用户名或密码错误！")
    }
    /* 
        这种登录形同虚设
            HTTP协议是一个无状态的协议，
                服务器无法区分请求是否发送自同一个客户端

            cookie
                -cookie是HTTP协议中用来解决无状态问题的技术
                -cookie的本质就是一个头
                    -服务器以响应头的形式将cookie发送给客户端
                        客户端收到后会将其存储，并在下次向服务器发送请求时将其传回
                        这样服务器就可以根据cookie来识别出客户端了
    */
})

// 使路由生效
app.use("/students",require("./routes/student"))
app.listen(3000,() => {
    console.log("服务器启动成功！");
})

//可以在所有路由后配置错误路由
app.use((req,res) => {
    //只要这个中间件执行，说明上面的地址都没匹配
    res.status(404)
    res.send("<h1>该地址已被外星人劫持</h1>")
})