/*
数据库
------

数据库是应用最广泛的计算机软件
数据库现在主要分 SQL (Structured Query Language) 关系型数据库（传统）
和 NoSQL（新式比如 mongodb）
和一些其他数据库（比如 facebook 的图数据库）
本课只讲 sqlite 和 mongodb

sqlite
-----
选用 better-sqlite3 这个模块, 是同步语法, 写起来舒服
使用 `yarn add better-sqlite3` 安装

注意:
如果在 windows 下使用 yarn add better-sqlite3 安装失败, 就按照下面的方式解决
// 1. 用管理员身份打开命令行, 切换到项目目录
// 2. yarn global add windows-build-tools
// 3. 安装 python2.7 并且设置环境变量
// 4. yarn install

// 如果还是失败的话, 从 http://landinghub.visualstudio.com/visual-cpp-build-tools 下载 Visual C++ Build Tools 2015 并且安装
// 然后执行 yan install
安装完成后再需要安装一个叫 sqlitebrowser 的管理软件

mongodb
-------

需要安装，链接如下

1. 软件本身

    - windows：
        1. 下载安装 http://www.runoob.com/mongodb/mongodb-window-install.html
        2. 创建 `C:\data\db` 文件夹

    - mac： `brew install mongodb`
    用 mac 的不会安装 mongodb 的在群里 AT 我

2. 管理软件:
    https://robomongo.org/download




sqlite
------

常用的关系型数据库有 mysql postgresql sqlite 等（具体区别上课再说）

传统数据库以表的形式存储数据
一张表可以有很多个字段
类似 excel 表格


以用户表为例, 存储 4 个数据的表结构如下
`
用户 id
用户名
密码
邮箱
`

范例数据如下
`
1 gua 123 gua@qq.com
2 gua1 23 gua1@q.com
`

数据库通过 SQL 来操作数据
SQL （结构化查询语言）
操作数据库的接口 也就是操作数据库的方法
- 增加数据
- 删除数据
- 修改数据
- 查询数据
- CRUD create retrieve update delete

SQL 语句如下（仅为范例，上课会讲具体的语法）
``` js
const form = {
    id: 2,
    username: '',
    password: '',
    email: '',
}
User.create(form)
```

``` sql
INSERT INTO
    users (id,username,password,email)
VALUES
    (2,'','', NULL);


UPDATE users SET username=? WHERE _rowid_='2';
UPDATE users SET password=? WHERE _rowid_='2';
UPDATE users SET email=? WHERE _rowid_='2';
```

几种关系型数据库的用法和 sql 语法都极度相似
开发中一般会用 sqlite 数据库
部署到服务器上的时候才会使用 mysql 等数据库
当然 mysql 已经不适合这个版本了
对于 node 来说, mongo 是非常方便的
MEAN 技术栈 = mongo + express + angular + node


参考书
------
- 《SQL 必知必会》
- 《MySQL 必知必会》
*/