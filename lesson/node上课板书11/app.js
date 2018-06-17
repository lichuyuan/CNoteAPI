const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const cors = require('cors')

const path = require('path')

const { log } = require('./utils')
const { secretKey } = require('./config')

// 先初始化一个 express 实例
const app = express()

// 设置 bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}))
// 解析 json 格式的数据
app.use(bodyParser.json())
// 设置 session, 这里的 secretKey 是从 config.js 文件中拿到的
app.use(session({
    secret: secretKey,
}))
// app.use(cors())

// 配置 nunjucks 模板, 第一个参数是模板文件的路径
nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})

// 配置静态资源文件, 比如 js css 图片
const asset = path.join(__dirname, 'static')
app.use('/static', express.static(asset))


// 引入路由文件
const index = require('./routes/index')
const topic = require('./routes/topic')
const reply = require('./routes/reply')

// 注册路由
app.use('/', index)
app.use('/topic', topic)
app.use('/reply', reply)

const apiTopic = require('./api/topic')
app.use('/api/topic', apiTopic)

// 添加 404 和 500 的处理页面
app.use((request, response) => {
    response.status(404)
    response.render('404.html')
})

app.use((error, request, response) => {
    console.error(error.stack)
    response.status(500)
    response.send('定制的 500 错误')
})

const run = (port=3000, host='') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        log(`listening server at http://${address.address}:${address.port}`)
    })
}

if (require.main === module) {
    const port = 4000
    const host = '0.0.0.0'
    run(port, host)
}
