const crypto = require('crypto')

const {mongoose, Model} = require('./main')
const {log} = require('../utils')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    note: String,
    role: {
        type: Number,
        default: 2,
    },
    created_time: {
        type: Number,
        default: Date.now(),
    },
    updated_time: {
        type: Number,
        default: Date.now(),
    },
    avatar: {
        type: String,
        default: 'default.gif',
    },
})

class UserStore extends Model {
    static async create(form) {
        form.password = this.saltedPassword(form.password)
        const u = await super.create(form)
        return u
    }

    static saltedPassword(password, salt='sjdf823jewqlk') {
        const salted = password + salt
        const hash = crypto.createHash('sha256')
        hash.update(salted)
        const h = hash.digest('hex')
        return h
    }

    static async validateLogin(form) {
        const {username, password} = form
        const u = await this.findBy('username', username)
        return u !== null && u.password === this.saltedPassword(password)
    }

    static async register(form) {
        const { username, password } = form
        const validForm = username.length > 2 && password.length > 2
        const uniqueUser = await this.findBy('username', username) === null
        if (validForm && uniqueUser) {
            const u = await this.create(form)
            return u
        } else {
            return null
        }
    }

    isAdmin() {
        return this.role === 1
    }

    static guest() {
        // 这样设置 _id 生成的实例就不会带有 _id 了
        const o = {
            _id: 0,
            role: -1,
            username: '游客',
        }
        const u = new User(o)
        return u
    }
}


userSchema.loadClass(UserStore)
const User = mongoose.model('User', userSchema)


User.guest()


module.exports = User
