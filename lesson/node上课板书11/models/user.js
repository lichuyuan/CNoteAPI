const Model = require('./main')
const crypto = require('crypto')

class User extends Model {
    constructor(form={}) {
        super(form)
        this.username = form.username || ''
        this.password = form.password || ''
        this.note = form.note || ''
        this.role = 2
    }

    static create(form={}) {
        form.password = this.saltedPassword(form.password)
        const u = super.create(form)
        u.save()
        return u
    }

    static saltedPassword(password, salt='sjdf823jewqlk') {
        const salted = password + salt
        const hash = crypto.createHash('sha256')
        hash.update(salted)
        const h = hash.digest('hex')
        return h
    }

    static validateLogin(form) {
        const {username, password} = form
        const u = this.findBy('username', username)
        return u !== null && u.password === this.saltedPassword(password)
    }

    static login(form={}) {
        const { username, password } = form
        const pwd = this.saltedPassword(password)
        const u = User.findBy('username', username)
        return u !== null && u.password === pwd
    }

    static register(form={}) {
        const { username, password } = form
        const validForm = username.length > 2 && password.length > 2
        const uniqueUser = User.findBy('username', username) === null
        if (validForm && uniqueUser) {
            const u = this.create(form)
            u.save()
            return u
        } else {
            return null
        }
    }

    static guest() {
        const o = {
            id: -1,
            username: '游客',
        }
        const u = this.create(o)
        return u
    }

    isAdmin() {
        // 一般第一个管理员都是手动指定的, 假设第一个用户是管理员
        // 当然也可以通过指定 user.role 来确认谁是管理员
        return this.id === 1
    }
}

module.exports = User
