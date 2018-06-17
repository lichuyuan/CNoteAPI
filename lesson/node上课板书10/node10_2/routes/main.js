const User = require('../models/user')

const { log } = require('../utils')

const currentUser = (request) => {
    // 通过 session 获取 uid, 如果没有的话就设置成空字符串
    const uid = request.session.uid || -1
    const u = User.get(uid)
    if (u === null) {
        return User.guest()
    } else {
        return u
    }
}

module.exports = {
    currentUser: currentUser,
}