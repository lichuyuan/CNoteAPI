const crypto = require('crypto')

const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
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
        default: 'default.png',
    },
}, { versionKey: false })

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
        const { username, password } = form
        const u = await this.findOne({ username })
        return u !== null && u.password === this.saltedPassword(password)
    }

    static async validateRegister(form) {
        const { username, password } = form
        const validForm = username.length > 2 && password.length > 2
        const uniqueUser = await this.findOne({ username }) === null
        if (validForm && uniqueUser) {
            return this.create(form)
        } else {
            return null
        }
    }

    isAdmin() {
        return this.role === 1
    }

    static async update(form) {
        const id = form.id
        const t = await this.findById(id)
        const frozonKeys = [
            'id',
            'created_time',
        ]
        Object.keys(form).forEach(k => {
            if (!frozonKeys.includes(k)) {
                t[k] = form[k]
            }
        })

        t.updated_time = Date.now()
        t.save()
        return t
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

module.exports = User
