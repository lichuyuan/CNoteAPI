const User = require('../models/user')

const { log } = require('../utils')

const currentUser = (request) => {
    // 通过 session 获取 uid, 如果没有的话就设置成空字符串
    const uid = request.session.uid || ''
    const u = User.findBy('id', uid)
    if (u === null) {
        return User.guest()
    } else {
        return u
    }
}

const loginRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.id === -1) {
        log('登录检测: 没有登录', request.method)
        const baseUrl = '/login'
        if (request.method === 'POST') {
            response.redirect(baseUrl)
        } else {
            // 应该用一个函数来生成 url, 这里的写法实际上并不好, 因为以后可能还会添加相关的数据
            const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(nextUrl)
        }
    } else {
        // 如果登录了就什么都不做, 继续下一个请求函数
        // 下一个请求函数直接用 next
        next()
    }
}

const adminRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.isAdmin()) {
        next()
    } else {
        response.redirect('/login')
    }
}

const htmlResponse = (response, path, data) => {
    response.render(path, data)
}

module.exports = {
    currentUser: currentUser,
    htmlResponse: htmlResponse,
    loginRequired: loginRequired,
}
