/* 
    在node中，默认支持的模块化规范叫做CommonJS
        在CommonJS中，一个js文件就是一个模块

    CommonJS规范
        -引入模块
            -使用require("模块的路径")函数来引入模块
            -引入自定义模块时，模块名要以 ./ 或 ../ 开头
            -扩展名可以省略
                -在CommonJS中，如果省略js文件的扩展名，
                    node会自动为文件补全扩展名

        -引入核心模块
            -直接写核心模块的名字即可
            -也可以在核心模块前添加 node:
*/
const m1 = require("./mokuai.js")
console.log(m1);
// m1.c()

const path = require("node: path")