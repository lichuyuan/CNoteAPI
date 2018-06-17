const fs = require('fs')
const log = require('./utils')

const { User, Message } = require('./models')

// 使用一个全局变量来保存 session 信息
// session 可以在服务器端实现过期功能, 上课会讲
const session = {}

const randomStr = () => {
    const seed = 'gsdnlkmvccoklmewfds45768oiwsdfg'
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

const currentUser = (request) => {
    const id = request.cookies.user || ''
    log('debug session', session, id, request.cookies)
    const username = session[id] || '游客'
    // const username = id
    return username
}


const headerFromMapper = (mapper={}) => {
    let base = 'HTTP/1.1 200 OK\r\n'
    const keys = Object.keys(mapper)
    const s = keys.map((k) => {
        const v = mapper[k]
        const h = `${k}: ${v}\r\n`
        return h
    }).join('')

    const header = base + s
    return header
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
        const u = User.create(form)
        // 如果不把 validateLogin 方法提取出去, 那就需要像下面这种形式写代码
        // if (u.username === 'gua' && u.password === '123') {
        //
        // }
        if (u.validateLogin()) {
            const sid = randomStr()
            session[sid] = u.username
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

const error = (code=404) => {
    const e = {
        404: 'HTTP/1.1 404 NOT FOUND\r\n\r\n<h1>NOT FOUND</h1>',
    }
    const r = e[code] || ''
    return r
}

// 留言板的处理函数, 返回留言板的响应
const message = (request) => {
    const username = currentUser(request)
    if (username === '游客') {
        return error()
    }
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



// 把 route 放在一起, 然后暴露出去
const routeMapper = {
    '/': index,
    '/static': static,
    '/login': login,
    '/register': register,
    '/message': message,
}

module.exports = routeMapper
