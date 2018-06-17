const Model = require('./main')

class User extends Model {
    constructor(form={}) {
        // 继承的时候, 要先调用 super 方法, 才可以使用 this, 这里的 super 就是套路
        super(form)
        // User 类定义两个属性
        this.username = form.username || ''
        this.password = form.password || ''
    }

    // 校验登录的逻辑
    static validateLogin(form) {
        const {username, password} = form
        const us = User.all()
        const u = User.findBy('username', username)
        return u !== null && u.password === password
    }

    // 校验注册的逻辑
    validateRegister() {
        return this.username.length > 2 && this.password.length > 2
    }
}

module.exports = User