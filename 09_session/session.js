const express = require("express")
const path = require("path")

const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")
//将ejs设置为默认的模板引擎
app.set("view engine","ejs")
//配置模板路径
app.set("views",path.resolve(__dirname,"views"))
//设置session中间件
app.use(session({
    secret:"hello"
}))
app.use(cookieParser())
//配置静态资源路径
app.use(express.static(path.resolve(__dirname,"public")))
//配置请求体解析
app.use(express.urlencoded({ extended: true }))

app.get("/set",(req,res) => {
    /* 
        cookie的有效期
            -默认情况下，cookie的有效期就是一次会话（session）
                会话就是浏览器的一次打开到关闭的过程
            -maxAge 用来设置cookie的有效时间，单位是毫秒

        cookie的不足
            -cookie是由服务器创建，浏览器保存
                每次浏览器访问服务器时都需要将cookie发回
                    这就导致我们不能在cookie里存放较多的数据
                    并且cookie直接存储在客户端，容易被篡改盗用
            -注意：
                我们在使用cookie时，一定不要在cookie中存储敏感数据
            
            -所以为了弥补cookie的不足，我们可以：
                将用户的数据统一存储在服务器中，每个用户的数据都有一个对应的id
                    我们只需通过cookie将id发送给浏览器，浏览器只需每次访问时将id发回
                        即可读取到服务器中存储的数据，这个技术我们称之为session（会话）

        session
            -session是服务器中的一个对象，这个对象用来存储用户的数据
            -每一个session对象都有一个唯一的id，id会通过cookie的形式发送给客户端
            -客户端每次访问时只需将存储有id的cookie发回即可获取它在服务器中存储的数据
            -在express中可通过express-session组件来实现session的使用
            -使用步骤：
                1.安装
                    yarn add express-session
                2.引入
                    const session = require("express-session")
                3.设置为中间件
                    app.use(session({...}))
    */
    res.cookie("name","sunwukong",{
        maxAge:1000*60*60*24*30
    })
    req.session.username = "sunwukong"
    // console.log(req.session);
    // res.send("设置cookie及有效期")
    res.send("查看session")
})

app.get("/get",(req,res) => {
    const name = req.cookies.name
    const username = req.session.username
    console.log(name);
    console.log(username);
    // res.send("读取cookie")
    res.send("读取session")
})

app.get("/delete",(req,res) => {
    /* 
        cookie一旦发送给浏览器就不能修改了
            但是我们可以通过发送新的同名cookie来替换旧的cookie，从而达到修改的目的
    */
    res.cookie("name","",{
        maxAge:0
    })
    res.send("删除cookie")
})

app.listen(3000,() => {
    console.log("服务器启动成功！");
})

//可以在所有路由后配置错误路由
app.use((req,res) => {
    //只要这个中间件执行，说明上面的地址都没匹配
    res.status(404)
    res.send("<h1>该地址已被外星人劫持</h1>")
})