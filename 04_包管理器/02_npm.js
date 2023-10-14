/* 
    package.json
        scripts:
            -可以自定义一些命令
            -定义以后可以直接通过npm来执行这些命令
                -start/test可以直接通过 npm start / npm test 执行
                -其他命令需要通过 npm run xxx 来执行

    npm镜像
        -npm的仓库的服务器位于国外，有时候并不好用
            为了解决这个问题，可以在npm中配置一个镜像的服务器
        -镜像的配置：
            ①在系统中安装cnpm（并不推荐）
                npm install -g cnpm --registry=https://registry.npmmirror.com
            ②彻底修改npm仓库地址（比较推荐）
                npm set registry https://registry.npmmirror.com
                -还原到原来的仓库
                    npm cnofig delete registry

*/