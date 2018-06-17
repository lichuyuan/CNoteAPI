/*

 node 11

 topic 列表页面
 新增 回复数/浏览数

 topic 详细页面
 新增浏览次数功能

 评论功能
 新增 reply model
 在 topic 详细页面添加评论
 在 topic 详细页面显示所有回复

 板块功能(board)
 板块的添加属于管理员操作
 添加新 topic 的时候, 需要选择板块
 默认会给你选中当前板块

 用户资料管理功能
 用户头像上传


 ejs
 erb


 ============
 package.json
 devDependencies 是项目开发(在本地开发)时需要的模块
 dependencies 是项目运行(在服务器上运行)时需要的模块


 注意, 如果碰到下载 node module 比较慢, 可以考虑换一个源
 // 把 node module 的源换成淘宝的, 然后就会从 taobao 的源下载, 这样就很快
 // 如果下载很快, 就不需要换源
 yarn config set registry 'https://registry.npm.taobao.org'




 ============
 前后端分离
 这里提到的前后端分离并不是指工作职责上的分离
 (职责上通过其他方式分离), 而是指开发环境上的分离(实际上就是指前后端 repo 的分离)
 普通的开发模式是前端写客户端, 后端写 api 服务端
 这种方式存在下面的问题:
 前端需要搭建后端的开发环境, 然后运行后端的项目
 前后端对接的时候后端改动一个地方, 前端可能需要更新项目代码, git pull 之后发现需要更新更多的代码


 也有另外一个方式, 前后端在两个环境中, 然后后端设置好 cors 解决跨域问题

 前后端分离是可以解决这个问题的, 目前比较好的做法是使用 node 做转发服务器,
 当然也有通过配置 nginx 的方式来实现分离, 但是前端显然对 node 会更加熟悉
 分离之后的处理流程是
 浏览器发送请求, node 接收到请求
 node 把这个请求发送到 api server, api server 处理好请求并且返回响应
 node 接收 api server 返回的响应, 并且把这个响应发送到浏览器端
 浏览器接收响应, 渲染页面


lambda x: (x * x + 100) ** 0.5

var a = function(x) {
    var b = x * x
    var c = b + 100
    var d = Math.sqrt(c)
    return d
}


跨域问题
标志报错信息 Access-Control-Allow-Origin
解决方式: cors
 */
