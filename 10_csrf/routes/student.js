const express = require("express")
//创建router对象
const router = express.Router()
let Stu_Arr = require("../data/students.json")
const path = require("path")
const fs = require("fs/promises")
const { log } = require("console")
//引入uuid
const uuid = require("uuid").v4

router.use((req,res,next) => {
    //设置中间件，给每个功能添加限制
    if(req.session.loginUser){
        // session默认有效期是一次会话
        next()
    }else{
        res.redirect("/")
    }
})
//学生列表的路由
router.get("/list",(req,res) => {
    /* // if(req.cookies.username){
    //     res.render("students",{stus: Stu_Arr})
    // }else{
    //     res.redirect("/")
    // } */
    /* if(req.session.loginUser){
        // session默认有效期是一次会话
        res.render("students",{stus: Stu_Arr})
    }else{
        res.redirect("/")
    } */

    //生成一个token
    const csrfToken = uuid()
    //将token添加到session中
    req.session.csrfToken = csrfToken
    req.session.save(() => {
        res.render("students",{stus: Stu_Arr,username:req.session.loginUser,csrfToken})
    })
})

//添加学生的路由
router.post("/add",(req,res,next) => {
    //客户端返回的token
    const csrfToken = req.body.token
    //存储在session中的token
    const sessionToken = req.session.csrfToken
    //清空session中的token
    req.session.csrfToken = null
    //将客户端返回的token和session中的token进行比较
    if(csrfToken === sessionToken){
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
        //将数据保存到session
        req.session.save(() => {
            //调用next()交由后续路由处理
            next()
        })
    }else{
        res.status(403).send("token error!")
    }
    
})

//修改学生信息路由
router.post("/update",(req,res,next) => {
    const {id, name, age, gender, address} = req.body
    const student = Stu_Arr.find(item => item.id == id)
    student.name = name
    student.age = +age
    student.gender = gender
    student.address = address
    //调用next()交由后续路由处理
    next()
})

//获取要修改的学生信息路由
router.get("/to-update",(req,res) => {
    //获取要修的学生的id
    const id = +req.query.id
    //获取要修改学生的信息
    const student = Stu_Arr.find(item => item.id === id)
    res.render("update",{student})
})

//删除学生信息路由
router.get("/delete",(req,res,next) => {
    //获取要删除的id
    const id = +req.query.id
    //删除该id的信息
    Stu_Arr=Stu_Arr.filter((stus) => stus.id !== id)
    //调用next()交由后续路由处理
    next()
})

//处理存储数据的中间件
router.use((req,res) => {
    //将新数据写进json文件里
    fs.writeFile(
        path.resolve(__dirname,"../data/students.json"),
        JSON.stringify(Stu_Arr)
        ).then(() => {
            res.redirect("/students/list")
        }).catch(() => {
            //...
        })
})

//将router暴露到模块外
module.exports = router