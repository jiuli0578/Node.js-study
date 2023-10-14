/* 
    默认情况下，node中的模块化标准是CommonJS
        要想使用ES的模块化，可以采用以下两种方式
            1.使用mjs作为扩展名
            2.修改package.json将模块化规范设置为ES模块
                当我们设置 "type": "module" 当前项目下的所有的JS文件都默认为es module
*/

//导入模块  es不能省略扩展名（官方标准）
/* import {a, b, c} from "./mokuai.mjs"
console.log(a, b, c);   //10 孙悟空 {name: '猪八戒'} */

/* 
    名字要与模块中的名字相同，否则会报错 
        或者通过as 来指定别名
*/

/* import {a as hello, b, c} from "./mokuai.mjs"
console.log(hello); //10
 */

/* 
    可以用import *来导入所有的，但是开发时要尽量避免这种情况
*/
import * as mk from "./mokuai.mjs"
console.log(mk.c);  //{name: '猪八戒'}

//导入模块的默认导出，可以随意命名
import sum from "./mokuai.mjs"
console.log(sum);

/* 
    通过ES模块化，导入的内容都是常量
    es模块都是运行在严格模式下的
        ES模块化，在浏览器中同样支持，但是通常我们不会直接使用
            通常会结合打包工具使用
*/
import {a, b, c} from "./mokuai.mjs"
/* a = 20
console.log(a); //错误，不能为常量赋值 */
c.name = "沙和尚"
console.log(c.name);    //沙和尚