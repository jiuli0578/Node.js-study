/* 
    所有的CommonJS的模块都会被包装到一个函数中
    (function(exports, require, module, __filename, __dirname) {
        // 模块代码会被放到这里
    });
*/
console.log(__filename);    //__filename 表示当前模块的绝对路径
console.log(__dirname);     //__dirname 表示当前模块所在的目录