const express = require("express")
//创建router对象
const router = express.Router()
let Stu_Arr = require("../data/students.json")
const path = require("path")
const fs = require("fs/promises")
const { log } = require("console")

//学生列表的路由
router.get("/list",(req,res) => {
    if(req.cookies.username){
        res.render("students",{stus: Stu_Arr})
    }else{
        res.redirect("/")
    }
})

//添加学生的路由
router.post("/add",(req,res,next) => {
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
    //调用next()交由后续路由处理
    next()
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