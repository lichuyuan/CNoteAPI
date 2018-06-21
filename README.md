## 技术栈

node.js + express + mongodb + mongoose + es6


## 项目运行

```
项目运行之前，请确保系统已经安装以下应用
1、node (6.0 及以上版本)
2、mongodb (开启状态)
```

```
git clone https://github.com/lichuyuan/CNoteAPI  

cd CNoteAPI

npm install

npm run dev

```

# API接口文档

#### [接口文档地址](https://github.com/lichuyuan/CNoteAPI/blob/master/API.md)

# 项目布局

```
.
├── config                       
│   ├── index.js                   // 默认配置
├── controller                     // 处理中心，负责路由及业务逻辑
│   ├── api
│   │   ├── v1
│   │   │   ├── note.js            // 笔记相关路由
│   │   │   ├── notebook.js        // 笔记相关路由
│   │   │   ├── user.js            // 用户相关路由
│   ├── web                        // 后续添加后台页面备用
│   ├── auth.js                    // 用户相关中间件及公用函数
├── model                          // 数据模型，负责处理数据以及和数据库交互
│   ├── main.js                    // 父模型，用于封装一些常用的处理数据的方法
│   ├── note.js                    // 笔记数据模型
│   ├── notebook.js                // 笔记本数据模型
│   ├── user.js                    // 用户数据模型
├── routes                         // 路由统一管理
├── static                         // 静态文件
├── uploads                        // 头像上传位置
├── utils                          // 工具函数
├── API.md                         // 接口文档
├── app.js                         // 基础配置，入口文件              
.

```
