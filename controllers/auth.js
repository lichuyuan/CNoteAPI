const User = require('../models/user')

const { log } = require('../utils/common')

const currentUser = async (req) => {
    // 通过 session 获取 uid, 如果没有的话就设置成空字符串
    const uid = req.session.uid
    log('uid', uid)
    if (uid === undefined) {
        return User.guest()
    } else {
        const u = await User.get(uid)
        if (u === null) {
            return User.guest()
        } else {
            return u
        }
    }
}

const loginRequired = async (req, res, next) => {
    const u = await currentUser(req)
    log(u)
    if (u.role === -1) {
        log('登录检测: 没有登录', req.method)
        const baseUrl = '/login'
        if (req.method === 'POST') {
            res.redirect(baseUrl)
        } else {
            const nextUrl = baseUrl + '?next_url=' + req.originalUrl
            res.redirect(nextUrl)
        }
    } else {
        next()
    }
}


module.exports = {
    currentUser,
    loginRequired,
}