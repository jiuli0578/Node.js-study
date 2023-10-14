/* 
    fs.readFile() 读取文件
    fs.appendFile() 创建新文件，或将数据添加到已有文件中
    fs.mkdir() 创建目录
    fs.rmdir() 删除目录
    fs.rm() 删除文件
    fs.rename() 重命名
    fs.copyFile() 复制文件
*/
/* 
    mkdir可以接受一个配置对象作为第二个参数，
        通过该参数可以对方法的功能进行配置
            recursive 默认值是 false
                -设置为 true 后，会自动创建不存在的上一级目录
*/
const fs = require("node:fs/promises")
const path = require("node:path")

/* fs.mkdir(path.resolve(__dirname, "./hello/abc"),{recursive:true})
    .then((result) => {
        console.log("创建成功");
    })
    .catch((err) => {
        console.log("创建失败",err);
    })  
 */
/* fs.rmdir(path.resolve(__dirname,"./hello"),{recursive:true})
    .then(result => {
        console.log("删除成功");
    })
    .catch(err => {
        console.log("删除失败",err);
    }) */

fs.rename(path.resolve(__dirname,"./hello.txt"),path.resolve(__dirname,"./haha.txt"))
    .then(result => {
        console.log("修改成功");
    })
    .catch(err => {
        console.log("修改失败",err);
    })