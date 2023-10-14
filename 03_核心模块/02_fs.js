/* 
    fs(File System)
        -fs用来帮助node来操作磁盘中的文件
        -文件操作也就是所谓的I/O，input output
        -使用fs，也需要先引入
*/
const fs = require("node:fs")
const path = require("node:path")
/* 
    readFileSync() 是同步读取文件的方法，会阻塞后面代码的运行
    当我们通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
        Buffer是一个临时用来存储数据的缓冲区
*/
const buf = fs.readFileSync(path.resolve(__dirname,"./hello.txt"))
console.log(buf.toString());

/* 
    readFile() 异步读取文件的方法
        使用回调函数，会出现回调地狱的可能
*/
fs.readFile(
    path.resolve(__dirname,"./hello.txt"),
    (err,buffer) => {
        if(err){
            console.log("读取出错了~");
        }
        else{
            console.log(buf.toString());
        }
})
console.log("哈哈哈");  //不会阻塞代码运行

/* 
    Promise版本的fs的方法
*/
const fs1 = require("node:fs/promises")
fs1.readFile(path.resolve(__dirname,"./hello.txt"))
    .then(buffer => {
        console.log(buf.toString());
    })
    .catch(err => console.log("读取出错了~")
    )

;(async() => {
    try{
        const buffer = await fs1.readFile(path.resolve(__dirname,"./hello.txt"));
        console.log(buf.toString());
    }
    catch{
        console.log("读取出错了~")
    }
})()

/* 
    fs.readFile() 读取文件
    fs.appendFile() 创建新文件，或将数据添加到已有文件中
    fs.mkdir() 创建目录
    fs.rmdir() 删除目录
    fs.rm() 删除文件
    fs.rename() 重命名
    fs.copyFile() 复制文件
*/
fs1.appendFile(
    path.resolve(__dirname,"./hello.txt"),
    ",今天也进步了"
    ).then(() => {
        console.log("添加成功！");
    })
