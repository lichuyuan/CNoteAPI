const User = require('../models/user')

const { log } = require('../utils/common')

const currentUser = async (req) => {
    // 通过 session 获取 uid, 如果没有的话就设置成空字符串
    const uid = req.session.uid
    if (uid === undefined) {
        return null
    } else {
        return User.get(uid)
    }
}

const loginRequired = async (req, res, next) => {
    const u = await currentUser(req)
    if (u === null) {
        const dict = {
            success: false,
            message: '登录后才能操作'
        }
        res.json(dict)
    } else {
        next()
    }
}


module.exports = {
    currentUser,
    loginRequired,
}