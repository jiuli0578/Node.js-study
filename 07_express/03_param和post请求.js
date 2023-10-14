//创建服务器
const express = require("express")
const app = express()
const path = require("path")

//创建数组存储用户信息
const userInf = [
    {
        username: "sunwukong",
        password: "123456",
        nickname: "齐天大圣"
    },
    {
        username: "zhubajie",
        password: "456789",
        nickname: "猪可爱"
    }
]
//设置中间件
app.use(express.static(path.resolve(__dirname,"./public")))

//引入解析请求体的中间件
app.use(express.urlencoded())

//配置路由
/* 
    get请求发送参数的第二种方式
        /:username/:password 表示当用户访问 /xxx/xxx 时就会触发
        在路径中以冒号命名的部分我们称为param，在get请求它可以被解析为请求参数
            可以通过req.params属性来获取这些参数
*/
app.get("/:username/:password",(req,res) => {
    console.log(req.params);
})

app.post("/login",(req,res) => {
    /* 
        通过req.body来获取post请求的参数（请求体中的参数）
        默认情况下express不会自动解析请求体，需要通过添加中间件来为其增加功能
    */
    const username = req.body.username
    const password = req.body.password
    /* for(const User of userInf){
        if(User.username === username && User.password === password){
            res.send(`<h1>登陆成功！ ${User.nickname}</h1>`)
            return
        }
    }
    res.send("<h1>登陆失败！</h1>") */

    // 使用数组的find方法也可以完成
    const LoginUser = userInf.find((items) => {
        return items.username === username && items.password === password
    })
    if(LoginUser){
        res.send(`<h1>登陆成功！ ${LoginUser.nickname}</h1>`)
    }else{
        res.send("<h1>登陆失败！</h1>")
    }
})


app.post("/zhuce",(req,res) => {
    //获取输入的信息
    const {username, nickname, password, repw} = req.body

    //判断用户名和昵称是否重复
    const ZhuceUser = userInf.find((items) => {
        return items.username === username || items.nickname === nickname
    })
    if(!ZhuceUser){
        userInf.push({
            username,
            nickname,
            password
        })
        res.send(`<h1>注册成功！</h1>`)
    }else{
        res.send(`<h1>注册失败！</h1>`)
    }
})
//启动服务器
app.listen(3000,() => {
    console.log("服务器已启动");
})