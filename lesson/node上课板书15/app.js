const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')

const path = require('path')

const { log } = require('./utils')
const { secretKey } = require('./config')

const app = express()

const configureApp = () => {
    app.use(bodyParser.urlencoded({
        extended: true,
    }))

    app.use(bodyParser.json())

    app.use(session({
        secret: secretKey
    }))

    configureTemplate()

    app.use((request, response, next) => {
        response.locals.flash = request.session.flash
        delete request.session.flash
        next()
    })

    const asset = path.join(__dirname, 'static')
    app.use('/static', express.static(asset))

    registerRoutes()
}

const configureTemplate = () => {
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
}

const registerRoutes = () => {
    const index = require('./routes/index')
    const todo = require('./routes/todo')
    const {user} = require('./routes/user')


    const apiTodo = require('./api/todo')
    const apiMovie = require('./api/movie')

    app.use('/', index)
    app.use('/todo', todo)
    app.use('/user', user)

    app.use('/api/todo', apiTodo)
    app.use('/api/movie', apiMovie)

    app.use((request, response, next) => {
        response.status(404)
        response.render('404.html')
    })

    app.use((error, request, response, next) => {
        console.error(error.stack)
        response.status(500)
        response.render('500.html')
    })
}

const run = (port=3000, host='') => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        log(`listening server at http://${address.address}:${address.port}`)
    })
}

if (require.main === module) {
    configureApp()

    const port = 5000
    const host = '0.0.0.0'
    run(port, host)
}
