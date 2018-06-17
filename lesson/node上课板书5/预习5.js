/*
本次上课的主要内容如下

增加 显示 修改 删除
Create
Read
Update
Detele
CRUD

1. 在 routes.js 中增加 redirect 函数用于返回 302 重定向响应
2. 一个简单的 todo 程序项目, 包含的文件如下
    routes_todo.js 包含了项目的所有路由函数
        显示所有 todo(包含在文件中)
        增加 todo(包含在文件中)
        更新 todo(上课讲)
        删除 todo(上课讲, 需要更改 Model)
    models/todo.js
        包含了 Todo Model, 用于处理数据
    templates/todo_index.html
        显示所有 todo 的页面
    templates/todo_edit.html
        显示编辑 todo 的界面 (现在是空白文件 上课会增加内容)


点击一个按钮新增一个 todo 的时候程序的流程如下
----------------------------------------------

包括原始 HTTP 协议的内容

1. 浏览器提交了一个表单给服务器 （发 POST 请求）

```
POST /todo/add HTTP/1.1
Host: ...
Content-Type: application/x-www-form-urlencoded

title=gua
```


2. 服务器解析表单数据，新增到数据库，返回 302 响应

```
HTTP/1.1 302 REDIRECT
Location: /todo
```

3. 浏览器识别到 302 请求，然后自动发送 GET 请求到 Location 中的地址
```
GET /todo HTTP/1.1
Host: ...
```

4. 服务器响应给浏览器一个页面
```
HTTP/1.1 200 OK
Content-Type: text/html

<html>
...
</html>
```

5. 浏览器得到网页内容，显示出来





把 TODO 改写为带用户功能的高级版(这部分上课讲)
---------------------------------------------
    涉及到不同数据的关联
    关联数据在服务器/浏览器之间的传递
 */