/* 
    ES 模块化
*/

//向外部导出内容
export let a = 10
export const b = "孙悟空"
export const c = {name:"猪八戒"}

/* 
    设置默认导出,一个模块中只有一个默认导出
        默认导出后面只能是一个值，不能是其他的
*/
export default function sum(a, b){
    return a + b
}

/* 
    export default let b = 20   //错误写法
    可以写成以下形式：
        let b = 20
        export default b
    或
        let b
        export default b = 20
*/