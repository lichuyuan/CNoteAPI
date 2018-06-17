const fs = require('fs')
const log = require('./utils')

const User = require('./models/user')
const Message = require('./models/message')

// 使用一个全局变量来保存 session 信息
// session 可以在服务器端实现过期功能, 上课会讲
const session = {}

const randomStr = () => {
    const seed = 'asdfghjokpwefdsui3456789dfghjk67wsdcfvgbnmkcvb2e'
    let s = ''
    for (let i = 0; i < 16; i++) {
        const random = Math.random() * seed.length
        const index = Math.floor(random)
        s += seed[index]
    }
    return s
}

// 读取 html 文件的函数
// 这样我们可以把页面的内容写入到 html 文件中, 专注处理逻辑
const template = (name) => {
    const path = 'templates/' + name
    const options = {
        encoding: 'utf8'
    }
    const content = fs.readFileSync(path, options)
    return content
}

const redirect = (url) => {
    // 浏览器在收到 302 响应的时候
    // 会自动在 HTTP header 里面找 Location 字段并获取一个 url
    // 然后自动请求新的 url
    const headers = {
        'Location': url,
    }
    // 增加 Location 字段并生成 HTTP 响应返回
    // 注意, 没有 HTTP body 部分
    const r = headerFromMapper(headers, 302) + '\r\n'
    return r
}

const currentUser = (request) => {
    const id = request.cookies.user || ''
    const uid = session[id]
    const u = User.findBy('id', uid)
    log('debug session', session, uid, typeof uid)
    return u
}


const headerFromMapper = (mapper={}, code=200) => {
    let base = `HTTP/1.1 ${code} Gua\r\n`
    const s = Object.keys(mapper).map(k => `${k}: ${mapper[k]}\r\n`).join('')

    const header = base + s
    return header
}

const loginRequired = (func) => {
    const f = (request) => {
        const u = currentUser(request)
        if (u === null) {
            // 没有登录
            return redirect('/login')
        } else {
            return func(request)
        }
    }
    return f
}

// 主页的处理函数, 返回主页的响应
// 请求的原文, path 是 /
/*
 GET / HTTP/1.1
 Host: 127.0.0.1:5000
 */

const index = (request) => {
    const headers = {
        'Content-Type': 'text/html',
    }
    const header = headerFromMapper(headers)
    let body = template('index.html')
    const username = currentUser(request)
    body = body.replace('{{username}}', username)
    const r = header + '\r\n' + body
    return r
}

// 登录的处理函数, 根据请求方法来处理业务
// 请求原始信息, path 是 /login

const login = (request) => {
    const headers = {
        'Content-Type': 'text/html',
    }
    let result
    log('debug request method', request.method)
    if (request.method === 'POST') {
        // 获取表单中的数据
        const form = request.form()
        // 根据 form 生成 User 实例
        if (User.validateLogin(form)) {
            const u = User.findBy('username', form.username)
            log('u id', u)
            const sid = randomStr()
            session[sid] = u.id
            headers['Set-Cookie'] = `user=${sid}`
            result = '登录成功'
        } else {
            result = '用户名或者密码错误'
        }
    } else {
        result = ''
    }
    const username = currentUser(request)
    let body = template('login.html')
    // 使用{{label}} 在页面里做一个记号, 直接替换掉这部分内容
    // 这里的 {{}} 是自己约定的, 完全可以换成其他的形式, 比如 <<>>, >_<result>_<
    body = body.replace('{{result}}', result)
    body = body.replace('{{username}}', username)
    const header = headerFromMapper(headers)
    const r = header + '\r\n' + body
    return r
}

// 注册的处理函数
const register = (request) => {
    let result
    if (request.method === 'POST') {
        const form = request.form()
        const u = User.create(form)
        if (u.validateRegister()) {
            // 如果 u 这个实例符合注册条件, 就调用 save 函数, 将这个 u 保存到文件中
            u.save()
            const us = User.all()
            result = `注册成功<br><pre>${us}</pre>`
        } else {
            result = '用户名或者密码长度必须大于2'
        }
    } else {
        result = ''
    }
    let body = template('register.html')
    body = body.replace('{{result}}', result)
    const headers = {
        'Content-Type': 'text/html',
    }
    const header = headerFromMapper(headers)
    const r = header + '\r\n' + body
    return r
}

// 留言板的处理函数, 返回留言板的响应
const message = (request) => {
    if (request.method === 'POST') {
        const form = request.form()
        const m = Message.create(form)
        m.save()
        // messageList.push(m)
    }
    let body = template('message.html')
    const ms = Message.all()
    body = body.replace('{{messages}}', ms)
    const headers = {
        'Content-Type': 'text/html',
    }
    const header = headerFromMapper(headers)
    const r = header + '\r\n' + body
    return r
}

const messageAdd = (request) => {
    if (request.method === 'POST') {
        const form = request.form()
        const m = Message.create(form)
        m.save()
        // messageList.push(m)
    }
    let body = template('message.html')
    const ms = Message.all()
    body = body.replace('{{messages}}', ms)
    const headers = {
        'Content-Type': 'text/html',
    }
    const header = headerFromMapper(headers)
    const r = header + '\r\n' + body
    return r
}

// 图片的响应函数, 读取图片并生成响应返回
const static = (request) => {
    // 静态资源的处理, 读取图片并生成相应返回
    const filename = request.query.file || 'doge.gif'
    const path = `static/${filename}`
    const body = fs.readFileSync(path)
    const header = headerFromMapper()

    const h = Buffer.from(header + '\r\n')
    const r = Buffer.concat([h, body])
    return r
}

const error = (code=404) => {
    const e = {
        404: 'HTTP/1.1 404 NOT FOUND\r\n\r\n<h1>NOT FOUND</h1>',
    }
    const r = e[code] || ''
    return r
}

// 把 route 放在一起, 然后暴露出去
const routeMapper = () => {
    const d = {
        '/': index,
        '/static': static,
        '/login': login,
        '/register': register,
        '/message': message,
        '/message/add': messageAdd,
    }
    return d
}

module.exports = {
    routeMapper: routeMapper,
    error: error,
    template: template,
    headerFromMapper: headerFromMapper,
    redirect: redirect,
    currentUser: currentUser,
    loginRequired: loginRequired,
}
