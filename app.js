const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const cors = require('cors')
const path = require('path')

const config = require('./config')
const { log } = require('./utils/common')

const app = express()

const configureApp = () => {

    const corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true,
        maxAge: '1728000'
    }
    app.use(cors(corsOptions))

    app.use(bodyParser.urlencoded({
        extended: true
    }))

    app.use(bodyParser.json())

    app.use(session({
        secret: config.secretKey
    }))

    configureNunjucks()

    // flash message
    app.use((req, res, next) => {
        res.locals.flash = req.session.flash
        delete req.session.flash
        next()
    })

    const asset = path.join(__dirname, 'static')
    app.use('/static', express.static(asset))

    registerRoutes()
}

// nunjucks 数据
const configureNunjucks = () => {
    const env = nunjucks.configure('views', {
        autoescape: true,
        express: app,
        noCache: true,
    })

    // 引入自定义的过滤器, 过滤器就是一个自定义的函数, nunjucks 可以用来处理数据
    const filter = require('./utils/filter')
    // nunjucks 添加自定义的过滤器
    env.addFilter('time', (ts) => filter.time(ts))
}

const registerRoutes = () => {
    const web = require('./routes/web')
    const api = require('./routes/api_v1')

    app.use('/', web)
    app.use('/api/v1', api)

    app.use((req, res, next) => {
        res.status(404)
        res.render('error/404.html')
    })

    app.use((error, req, res, next) => {
        console.error(error.stack)
        res.status(500)
        res.render('error/500.html')
    })
}

const run = (port, host) => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        log(`listening server at http://${address.address}:${address.port}`)
    })
}

if (require.main === module) {
    configureApp()

    run(5000, '0.0.0.0')
}
