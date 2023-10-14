/* 
    path
        -表示路径
        -通过path可以用来获取各种路径
        -需要使用path，要先对其进行引入
        -方法：
            path.resolve([...paths])
                -用来生成一个绝对路径
                    相对路径：./xxx  ../xxx  xxx
                    绝对路径：  
                        -在计算机本地：
                            c:\xxx  /user/xxx
                        -在网络中：
                            http://www.xxx
                            https://www.xxx

                    -如果直接调用resolve，则返回当前的工作目录
                        注意：
                            通过不同的方式执行代码，它的工作目录是有可能发生变化的
                -如果将一个相对路径作为参数，则resolve会自动将其转换为绝对路径
                    根据工作目录的不同，它所产生的绝对路径也不同
*/
const path = require("node:path")
// const result = path.resolve()
result = path.resolve("../hello.js")

//最终形态
//以后在使用路径时，尽量通过path.resolve() 来生成路径
result = path.resolve(__dirname,"./hello.js")
console.log(result);
