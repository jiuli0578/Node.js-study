const express = require("express")
const path = require("path")

const app = express()
const fs = require("fs/promises")
let Stu_Arr = require("./data/students.json")

let name = "孙悟空"
//将ejs设置为默认的模板引擎
app.set("view engine","ejs")
//配置模板路径
app.set("views",path.resolve(__dirname,"views"))

//配置静态资源路径
app.use(express.static(path.resolve(__dirname,"public")))
//配置请求体解析
app.use(express.urlencoded({ extended: true }))

//希望用户在访问students路由时，可以给用户返回一个带有学生信息的页面
app.get("/students",(req,res) => {
    /* 
        html属于静态页面，创建的时候是什么样子，用户看到的就是什么样子
            不会跟着服务器中数据的变化而变化

        node中由个东西叫模板，长得像网页，但是可以嵌入变量
            node中有很多个模板引擎，ejs就是其中的一种

            ejs使用步骤：
                1.安装ejs
                    yarn add ejs
                2.配置express的模板引擎为ejs
                    app.set("view engine","ejs")
                3.配置模板路径
                    app.set("views",path.resolve(__dirname,"views"))
            注意：
                模板引擎需要被express渲染后才能使用
    */
    /* 
        res.render()  用来渲染一个模板引擎，并将其返回给浏览器
            可以将一个对象作为render的第二个参数传递，这样在模板中可以访问到对象中的数据
                注意：ejs文件中，要使用<%= %>获取render传递的数据，才能在网页中显示出来
                        <%= %>  在ejs中直接输出内容时，它会自动的对字符串中的特殊符号进行转义 &lt;
                        <%- %>  直接将内容输出，又被xss注入的风险
                        <% %>   可以在其中直接编写js代码，js代码会在服务器中执行
    */
    // res.render("students",{name})
    res.render("students",{stus: Stu_Arr})
})

//修改姓名路由
app.get("/set_name",(req,res) => {
    name = req.query.name
    res.send("修改成功！")
})

//删除学生信息路由
app.get("/delete_Stu",(req,res) => {
    //获取要删除的id
    const id = +req.query.id
    //删除该id的信息
    Stu_Arr=Stu_Arr.filter((stus) => stus.id !== id)
    //将新数据写进json文件里
    fs.writeFile(
        path.resolve(__dirname,"data/students.json"),
        JSON.stringify(Stu_Arr)
        ).then(() => {
            res.redirect("/students")
        }).catch(() => {
            //...
        })
})

//获取要修改的学生信息路由
app.get("/to-update_Stu",(req,res) => {
    //获取要修的学生的id
    const id = +req.query.id
    //获取要修改学生的信息
    const student = Stu_Arr.find(item => item.id === id)
    res.render("update",{student})
})

//修改学生信息路由
app.post("/update_Stu",(req,res) => {
    const {id, name, age, gender, address} = req.body
    const student = Stu_Arr.find(item => item.id == id)
    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address
    //将数据写进json文件里
    fs.writeFile(
        path.resolve(__dirname,"data/students.json"),
        JSON.stringify(Stu_Arr)
        ).then(() => {
            res.redirect("/students")
        }).catch(() => {
            //...
        })
})
//添加学生信息路由
app.post("/Add_Stu",(req,res) => {
    //获取id
    const id = Stu_Arr.at(-1) ? Stu_Arr.at(-1).id + 1 : 1
    //获取用户输入的信息
    const newStu = {
        id,
        name: req.body.name,
        age: +req.body.age,
        gender: req.body.gender,
        address: req.body.address
    }
    //将用户输入的信息添加到数组
    Stu_Arr.push(newStu)
    //将数据写进json文件里
    fs.writeFile(
        path.resolve(__dirname,"data/students.json"),
        JSON.stringify(Stu_Arr)
        ).then(() => {
            res.redirect("/students")
        }).catch(() => {
            //...
        })
    //返回响应
    // res.render("students",{stus: Stu_Arr})   //直接在添加路由中渲染ejs，会面临表单重复提交的问题
    /* 
        res.redirect()  用来发起请求重定向
            重定向的作用是告诉浏览器向另一个地址再次发起一次请求
    */
    // res.redirect('/students')

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