/*
本次上课的主要内容如下

1. 安装 nunjucks
安装 yarn 之后在项目目录下输入下面的命令安装 nunjucks
yarn add nunjucks

windows 使用群里面的安装包来安装 yarn
mac 先安装 homebrew, 然后使用 brew install yarn 来安装 yarn
不会的在群里问一下


2. 改进 log 把记录写入文件

3. 模板和模板使用方法
参考下面 2 个文件
nunjucks_demo.js
templates/demo.html

4. 用模板实现 todo 程序
参考下面 2 个文件
routes_todo.js
templates/todo_index.html

5. 用模板实现登录注册
参考下面 3 个文件
routes_user.js
templates/login.html
templates/register.html

RESTful
app.get('/todos')
app.get('/todo/:id')
app.post('/todo')
app.put('/todo')
app.patch('/todo')
app.delete('/todo')


// 我们的路由方案
/todo/all
/todo/:id
/todo/delete
/todo/add
/todo/update
 */
