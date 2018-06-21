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

```

域名: http://111.231.93.141
端口: 5000

```

## 目录：

[1、用户注册](#用户注册)<br/>
[2、用户登录](#用户登录)<br/>
[3、判断用户是否登录](#3判断用户是否登录)<br/>
[4、注销登录](#注销登录)<br/>
[5、获取笔记本列表](#获取笔记本列表)<br/>
[6、添加笔记本](#添加笔记本)<br/>
[7、更新笔记本](#更新笔记本)<br/>
[8、删除笔记本](#删除笔记本)<br/>
[9、获取某个笔记本下的所有笔记](#获取某个笔记本下的所有笔记)<br/>
[10、添加笔记](#添加笔记)<br/>
[11、更新笔记](#更新笔记)<br/>
[12、将笔记放入回收站](#将笔记放入回收站)<br/>
[13、获取回收站笔记列表](#获取回收站笔记列表)<br/>
[14、恢复回收站笔记](#恢复回收站笔记)<br/>
[15、彻底删除笔记](#彻底删除笔记)<br/>


## 接口列表：

### 1、用户注册

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/user/register
```

#### 请求方式: 
```
POST
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string  |长度1到15个字符，只能是字母数字下划线中文 |
|password      |Y       |string  |密码, 长度6到16个任意字符 |

#### 返回示例：

```javascript
{
    "success": true,
    "data": {
        "avatar": "default.png",
        "_id": "5b2be7027e644b09f195ef8a",
        "username": "qweqqwe",
        "password": "d2a5c3cf439083309cb526c49afeb373844f1129bf315bdb805a1cfa94e917ed",
        "created_time": "2018-06-21T17:57:22.864Z",
        "updated_time": "2018-06-21T17:57:22.864Z"
    },
    "message": "注册成功"
}
```

### 2、用户登录

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/user/login
```

#### 请求方式: 
```
POST
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|username      |Y       |string  |长度1到15个字符，只能是字母数字下划线中文 |
|password      |Y       |string  |密码, 长度6到16个任意字符 |

#### 返回示例：

```javascript
{
    "success": true,
    "data": {
        "avatar": "default.png",
        "_id": "5b2be7027e644b09f195ef8a",
        "username": "qweqqwe",
        "password": "d2a5c3cf439083309cb526c49afeb373844f1129bf315bdb805a1cfa94e917ed",
        "created_time": "2018-06-21T17:57:22.864Z",
        "updated_time": "2018-06-21T17:57:22.864Z"
    },
    "message": "登录成功"
}
```

### 3、判断用户是否登录

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/user
```

#### 请求方式: 
```
GET
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
    "success": true,
    "data": {
        "avatar": "default.png",
        "_id": "5b2be7027e644b09f195ef8a",
        "username": "qweqqwe",
        "password": "d2a5c3cf439083309cb526c49afeb373844f1129bf315bdb805a1cfa94e917ed",
        "created_time": "2018-06-21T17:57:22.864Z",
        "updated_time": "2018-06-21T17:57:22.864Z"
    }
}
```

### 4、注销登录

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/user/logout
```

#### 请求方式: 
```
GET
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
    "success": true,
    "message": "注销成功"
}
```

### 5、获取笔记本列表

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/notebook
```

#### 请求方式: 
```
GET
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
    "success": true,
    "data": [
        {
            "note_counts": 0,
            "_id": "5b2beb167e644b09f195ef8b",
            "title": "test",
            "created_time": "2018-06-21T18:14:46.677Z",
            "updated_time": "2018-06-21T18:14:46.678Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        },
        {
            "note_counts": 0,
            "_id": "5b2bec117e644b09f195ef8c",
            "title": "test",
            "created_time": "2018-06-21T18:18:57.677Z",
            "updated_time": "2018-06-21T18:18:57.679Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        },
        {
            "note_counts": 0,
            "_id": "5b2bec127e644b09f195ef8d",
            "title": "test",
            "created_time": "2018-06-21T18:18:58.472Z",
            "updated_time": "2018-06-21T18:18:58.474Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        },
        {
            "note_counts": 0,
            "_id": "5b2bec137e644b09f195ef8e",
            "title": "test",
            "created_time": "2018-06-21T18:18:59.132Z",
            "updated_time": "2018-06-21T18:18:59.134Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        }
    ]
}
```

### 6、添加笔记本

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/notebook
```

#### 请求方式: 
```
POST
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|title      |Y       |string  |笔记本标题不能为空，且不超过30个字符|

#### 返回示例：

```javascript
{
    "success": true,
    "data": {
        "note_counts": 0,
        "_id": "5b2beb167e644b09f195ef8b",
        "title": "test",
        "created_time": "2018-06-21T18:14:46.677Z",
        "updated_time": "2018-06-21T18:14:46.677Z",
        "user_id": "5b2be7027e644b09f195ef8a"
    },
    "message": "创建成功"
}
```

### 7、更新笔记本

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/notebook/:id
```

#### 请求方式: 
```
PATCH
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |笔记本 ID|
|title      |Y       |string  |笔记本标题不能为空，且不超过30个字符|

#### 返回示例：

```javascript
{
    "success": true,
    "data": {
        "note_counts": 0,
        "_id": "5b2beb167e644b09f195ef8b",
        "title": "test1",
        "created_time": "2018-06-21T18:14:46.677Z",
        "updated_time": "2018-06-21T18:14:46.678Z",
        "user_id": "5b2be7027e644b09f195ef8a"
    },
    "message": "更新成功"
}
```

### 8、删除笔记本

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/notebook/:id
```

#### 请求方式: 
```
DELETE
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |笔记本 ID|

#### 返回示例：

```javascript
{
    "success": true,
    "message": "删除成功"
}
```

### 9、获取某个笔记本下的所有笔记

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/note
```

#### 请求方式: 
```
GET
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|notebook_id      |Y       |string  |笔记本 ID|
|deleted      |Y       |number  |值为0, 表示未被移至回收站 |

#### 返回示例：

```javascript
{
    "success": true,
    "data": [
        {
            "deleted": 0,
            "_id": "5b2bf16f7e644b09f195ef91",
            "notebook_id": "5b2bec117e644b09f195ef8c",
            "title": "test",
            "content": "test",
            "created_time": "2018-06-21T18:41:51.931Z",
            "updated_time": "2018-06-21T18:41:51.933Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        },
        {
            "deleted": 0,
            "_id": "5b2bf1ae7e644b09f195ef92",
            "notebook_id": "5b2bec117e644b09f195ef8c",
            "title": "test1",
            "content": "test",
            "created_time": "2018-06-21T18:42:54.491Z",
            "updated_time": "2018-06-21T18:42:54.492Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        },
        {
            "deleted": 0,
            "_id": "5b2bf1b07e644b09f195ef93",
            "notebook_id": "5b2bec117e644b09f195ef8c",
            "title": "test1",
            "content": "test",
            "created_time": "2018-06-21T18:42:56.194Z",
            "updated_time": "2018-06-21T18:42:56.195Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        },
        {
            "deleted": 0,
            "_id": "5b2bf1b07e644b09f195ef94",
            "notebook_id": "5b2bec117e644b09f195ef8c",
            "title": "test1",
            "content": "test",
            "created_time": "2018-06-21T18:42:56.813Z",
            "updated_time": "2018-06-21T18:42:56.815Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        }
    ]
}
```

### 10、添加笔记

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/note
```

#### 请求方式: 
```
POST
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|notebook_id      |Y       |string  |笔记本 ID|
|title      |N       |string  |笔记标题|
|content      |N       |string  |笔记本内容|

#### 返回示例：

```javascript
{
    "success": true,
    "data": {
        "deleted": 0,
        "_id": "5b2bf16f7e644b09f195ef91",
        "notebook_id": "5b2bec117e644b09f195ef8c",
        "title": "test",
        "content": "test",
        "created_time": "2018-06-21T18:41:51.931Z",
        "updated_time": "2018-06-21T18:41:51.933Z",
        "user_id": "5b2be7027e644b09f195ef8a"
    },
    "message": "创建成功"
}
```

### 11、更新笔记

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/note/:id
```

#### 请求方式: 
```
PATCH
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |笔记 ID|
|title      |N       |string  |笔记标题|
|content      |N       |string  |笔记本内容|

#### 返回示例：

```javascript
{
    "success": true,
    "data": {
        "deleted": 0,
        "_id": "5b2bf16f7e644b09f195ef91",
        "notebook_id": "5b2bec117e644b09f195ef8c",
        "title": "test1",
        "content": "test1",
        "created_time": "2018-06-21T18:41:51.931Z",
        "updated_time": "2018-06-21T18:41:51.933Z",
        "user_id": "5b2be7027e644b09f195ef8a"
    },
    "message": "更新成功"
}
```

### 12、将笔记放入回收站

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/note/:id
```

#### 请求方式: 
```
PATCH
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |笔记 ID|
|deleted      |Y       |number  |值为1, 表示将笔记移至回收站 |

#### 返回示例：

```javascript
{
    "success": true,
    "message": "已移至回收站"
}
```

### 13、获取回收站笔记列表

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/note
```

#### 请求方式: 
```
GET
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|deleted      |Y       |number  |值为1, 表示已移至回收站 |

#### 返回示例：

```javascript
{
    "success": true,
    "data": [
        {
            "deleted": 1,
            "_id": "5b2bf16f7e644b09f195ef91",
            "notebook_id": "5b2bec117e644b09f195ef8c",
            "title": "test1",
            "content": "test1",
            "created_time": "2018-06-21T18:41:51.931Z",
            "updated_time": "2018-06-21T18:47:46.783Z",
            "user_id": "5b2be7027e644b09f195ef8a"
        }
    ]
}
```

### 14、恢复回收站笔记

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/note/:id
```

#### 请求方式: 
```
PATCH
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |笔记 ID|
|deleted      |Y       |number  |值为0, 表示将笔记恢复 |

#### 返回示例：

```javascript
{
    "success": true,
    "message": "笔记已恢复至笔记本"
}
```

### 15、彻底删除笔记

#### 请求URL: 
```
http://111.231.93.141:5000/api/v1/note/:id
```

#### 请求方式: 
```
DELETE
```

#### 参数

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |Y       |string  |笔记 ID|

#### 返回示例：

```javascript
{
    "success": true,
    "message": "删除成功"
}
```


# 项目布局

```
.
├── InitData                        初始化数据
│   ├── activity.js                 餐馆活动
│   ├── category.js                 餐馆分类
│   ├── cities.js                   城市列表
│   ├── delivery.js                 配送方式
│   ├── entry.js                    食品分类
│   ├── explain.js                  解释说明
│   ├── hongbao.js                  红包
│   ├── payments.js                 支付方式
│   ├── rate.js                     评论
│   └── remark.js                   备注列表
├── config                          运行配置
│   ├── default.js                  默认配置
│   └── development.js              开发环境
├── controller                      处理中心，负责路由及数据库的具体操作
│   ├── admin
│   │   └── admin.js                管理员
│   ├── bos
│   ├── eus
│   ├── member
│   │   └── vipcart.js              会员卡
│   ├── payapi
│   ├── promotion
│   │   └── hongbao.js              红包
│   ├── shopping
│   │   ├── category.js             餐馆分类
│   │   ├── food.js                 食品
│   │   └── shop.js                 餐馆
│   ├── statis
│   │   └── statis.js               数据统计
│   ├── ugc
│   │   └── rating.js               评论
│   ├── v1
│   │   ├── address.js              收获地址
│   │   ├── captchas.js             验证码
│   │   ├── carts.js                购物车
│   │   ├── cities.js               城市列表
│   │   ├── order.js                订单
│   │   ├── remark.js               备注
│   │   └── search.js               搜索
│   ├── v2
│   │   ├── entry.js                食品分类
│   │   └── user.js                 用户信息
│   ├── v3
│   │   └── explain.js              解析说明
│   └── v4
├── logs                            日志文件
├── middlewares                     中间价
│   ├── check.js                    权限验证    
│   └── statistic.js                API数据统计
├── models                          模型(数据库)
│   ├── admin
│   │   └── admin.js                管理员模型
│   ├── bos
│   │   └── order.js                订单模型
│   ├── eus
│   ├── ids.js
│   ├── member
│   ├── payapi
│   ├── promotion
│   │   └── hongbao.js              红包模型
│   ├── shopping
│   │   ├── activity.js             餐馆活动模型
│   │   ├── category.js             餐馆分类模型
│   │   ├── delivery.js             配送方式模型
│   │   ├── food.js                 食品模型
│   │   └── shop.js                 餐馆模型
│   ├── statis
│   │   └── statis.js               数据统计模型
│   ├── ugc
│   │   └── rating.js               评论模型
│   ├── v1
│   │   ├── address.js              收获地址模型
│   │   ├── cart.js                 购物车模型
│   │   ├── cities.js               城市列表模型
│   │   ├── payments.js             付款方式模型
│   │   └── remark.js               备注模型
│   ├── v2
│   │   ├── entry.js                食品分类模型
│   │   ├── user.js                 用户模型
│   │   └── userInfo.js             用户信息模型
│   ├── v3
│   │   └── explain.js              解释说明模型
│   └── v4
├── mongodb                         连接数据库
│   └── db.js
├── prototype                       基础功能Class
│   ├── addressComponent.js         与腾讯、百度地图API相关的Class
│   └── baseComponent.js            底层类
├── public                          静态资源目录
├── routes                          路由配置
│   ├── admin.js                    管理员
│   ├── bos.js                      订单
│   ├── eus.js                      用户
│   ├── index.js                    路由配置主文件
│   ├── member.js                   会员卡
│   ├── payapi.js                   付款
│   ├── promotion.js                红包
│   ├── shopping.js                 餐馆、食品、Menu
│   ├── statis.js                   数据统计
│   ├── ugc.js                      评论
│   ├── v1.js                       城市、用户、收获地址
│   ├── v2.js                       登陆、退出
│   ├── v3.js                       解释说明
│   └── v4.js                       餐馆
├── screenshots                     项目截图
├── views   
├── .babelrc 
├── .gitignore
├── API.md                          接口文档
├── app.js                          基础配置
├── COPYING                         GPL协议
├── index.js                        入口文件
├── package.json
├── README.md                  
.


```
