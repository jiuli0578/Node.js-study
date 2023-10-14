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
        ttl:10,
        //默认情况下，filestore会每间隔一小时，清除一次session对象
        //reapInterval 用来指定清除session的间隔，单位秒，默认为一小时
        reapInterval:10
    }),
    secret: "hello"
}))

/* 
    session是服务器中的一个对象，这个对象用来存储用户的数据
        每一个session对象都有一个唯一的id，session创建后
            id会通过cookie的形式发送给客户端
        浏览器收到后，每次访问都会将id发回，服务器中就可以根据id找到对应的session

    id（cookie） ---> session对象

    session什么时候会失效？
        1.浏览器的cookie没了
        2.服务器中的session对象没了

    express-session默认是将session存储到内存中的，所以服务器一旦重启，session会自动重置，
        所以我们使用session通常会对session进行持久化操作（写到文件或数据库）

    如何将session存储到文件中？
        -需引入一个中间件 session-file-store
        -使用步骤：
            1.安装：
                yarn add session-file-store
            2.引入：
                const FileStore = require('session-file-store')(session);
            3.设置为中间件
                app.use(session({
                    store: new FileStore({}),
                    secret: "hello"
                }))

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