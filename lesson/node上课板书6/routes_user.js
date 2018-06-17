const Session = require('./models/session')
const User = require('./models/user')
const {
    headerFromMapper,
    redirect,
    randomString,
    currentUser,
    htmlResponse,
} = require('./routes')

// const {a, b, c, d, e, f, g, h, i} = require('./xx')

const {log, template} = require('./utils')

const loginView = (request) => {
    const u = currentUser(request)
    const body = template('login.html', {
        username: u.username,
    })
    return htmlResponse(body)
}

const login = (request) => {
    const headers = {}
    let result = ''
    let u = null

    const form = request.form()
    if (User.validateLogin(form)) {
        u = User.findBy('username', form.username)
        const sessionId = randomString()
        Session.create({
            sessionId: sessionId,
            userId: u.id,
        })
        headers['Set-Cookie'] = `sessionId=${sessionId}`
        result = '登录成功'
    } else {
        result = '用户名或者密码错误'
        u = User.guest()
    }

    const body = template('login.html', {
        result: result,
        username: u.username,
    })
    return htmlResponse(body, headers)
}

const registerView = (request) => {
    const body = template('register.html')
    return htmlResponse(body)
}

// 注册的处理函数
const register = (request) => {
    let result = ''
    let us = []
    const form = request.form()
    if (User.validateRegister(form)) {
        User.create(form)
        us = User.all()
        result = `注册成功`
    } else {
        result = '用户名或者密码长度必须大于2'
    }
    const body = template('register.html', {
        result: result,
        us: us,
    })
    return htmlResponse(body)
}

const routeMapper = () => {
    const d = {
        '/login': loginView,
        '/user/login': login,
        '/register': registerView,
        '/user/register': register,
    }
    return d
}

module.exports = routeMapper
