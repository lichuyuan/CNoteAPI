const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
// const session = require('cookie-session')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)


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
// resave 是指每次请求都会重新把 session 存入 store 中
//
app.use(session({
    secret: secretKey,
    store: new RedisStore(),
    resave: false,
    saveUninitialized: false,
}))

// 配置 nunjucks 模板, 第一个参数是模板文件的路径
const env = nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    noCache: true,
})

// 引入自定义的过滤器, 过滤器就是一个自定义的函数, nunjucks 可以用来处理数据
const formattedTime = require('./filter/formatted_time')
// nunjucks 添加自定义的过滤器
env.addFilter('formattedTime', (ts) => {
    const s = formattedTime(ts)
    return s
})

// 有时候在页面跳转的时候需要提示用户一些信息,
// 比如某样操作需要管理员权限, 跳转到新页面的时候就要把这个信息告知用户
// 这是一个套路写法, 直接记住这样用就可以
app.use((request, response, next) => {
    // response.locals 会把数据传到页面中
    // 这里的处理方式是先把 flash 数据放在 session 中
    // 然后把 flash 里面的数据放在 response.locals 中
    // 接着删除 response.session 中的 flash 数据,
    // 这样只会在当前这次请求中使用 flash 数据
    log('request.session', request.session)
    response.locals.flash = request.session.flash
    delete request.session.flash
    next()
})

// 配置静态资源文件, 比如 js css 图片
const asset = path.join(__dirname, 'static')
app.use('/static', express.static(asset))


// 引入路由文件
const index = require('./routes/index')
const topic = require('./routes/topic')
const reply = require('./routes/reply')

// 引入 board 路由
const { board } = require('./routes/board')
const { user } = require('./routes/user')

// 注册路由
app.use('/', index)
app.use('/topic', topic)
app.use('/reply', reply)
app.use('/board', board)
app.use('/user', user)

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
    const port = 5000
    const host = '0.0.0.0'
    run(port, host)
}
