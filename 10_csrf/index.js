const express = require("express")
const path = require("path")

const app = express()
const session = require("express-session")
//引入session-file-store
const FileStore = require('session-file-store')(session)
const cookieParser = require("cookie-parser")
//将ejs设置为默认的模板引擎
app.set("view engine","ejs")
//配置模板路径
app.set("views",path.resolve(__dirname,"views"))
//设置session中间件
app.use(session({
    store: new FileStore({
        //指定session文件的路径
        path:path.resolve(__dirname,"./sessions"),
        //设置加密
        secret:"heihei",
        //设置session的有效时间，单位秒，默认为3600秒
        ttl:100,
        //默认情况下，filestore会每间隔一小时，清除一次session对象
        //reapInterval 用来指定清除session的间隔，单位秒，默认为一小时
        reapInterval:100
    }),
    secret: "hello"
}))

/* 
    csrf攻击
        -跨站请求伪造
            http://localhost:3000/students/delete?id=5
        -现在的大部分浏览器都不会在跨域的情况下自动发送cookie
            这样设计就是为了防止csrf攻击
        -如何解决？
            1.使用referer头来检查请求的来源
            2.使用验证码
            3.尽量使用post请求（结合token）
                -token令牌
                    -可以在创建表单时随机生成一个令牌
                        然后将令牌存储到session中，并通过模板发送给用户
                            用户提交表单时，必须将token返回，才可以进行后续操作
                                （可以使用uuid来生成token）
*/

app.use(cookieParser())
//配置静态资源路径
app.use(express.static(path.resolve(__dirname,"public")))
//配置请求体解析
app.use(express.urlencoded({ extended: true }))

app.get("/",(req,res) => {
    res.render("login")
})

//登录的路由
app.post("/login",(req,res) => {

    //获取用户名和密码
    const {username, password} = req.body
    if(username === "admin" && password === "123123"){
        // res.cookie("username",username)
        /* 
            登陆成功后，将用户信息放入到session中，这里仅仅是添加到内存中的session中
                并没有写入文件，为了使session可以立即存储，需要手动调用save()
        */
        req.session.loginUser = username
        req.session.save(() => {
            res.redirect("/students/list")
        })
    }else{
        res.send("用户名或密码错误！")
    }
})

//注销登录的路由
app.get("/logout",(req,res) => {
    //使session失效
    req.session.destroy(() => {
        res.redirect("/")
    })
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