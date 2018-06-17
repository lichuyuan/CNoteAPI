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
    let u = null

    const form = request.form()
    if (User.validateLogin(form)) {
        u = User.findBy('username', form.username)
        const s = Session.encrypt({
            uid: u.id,
        })
        const headers = {
            // Path 的 P 是大写的, 规定... 忍了
            'Set-Cookie': `session=${s}; Path=/`
        }
        return redirect('/', headers)
    } else {
        const result = '登录失败'
        const body = template('login.html', {
            result: result
        })
        return htmlResponse(body)
    }
}

const registerView = (request) => {
    const body = template('register.html')
    return htmlResponse(body)
}

// 注册的处理函数
const register = (request) => {
    let result = ''
    const form = request.form()
    if (User.validateRegister(form)) {
        result = `注册成功`
    } else {
        result = '用户名或者密码长度必须大于2'
    }
    const us = User.all()
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
