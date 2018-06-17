const Model = require('./main')
const crypto = require('crypto')

const {secretKey} = require('../utils')

class Session extends Model {
    constructor(form={}) {
        super(form)
        this.sessionId = form.sessionId || ''
        this.userId = ('userId' in form) ? form.userId : -1
        this.expiredTime = form.expiredTime || (Date.now() + 3600000)
    }

    expired() {
        const now = Date.now()
        const r = this.expiredTime < now
        return r
    }

    static decrypt(s) {
        const iv = '123456'
        const decipher = crypto.createDecipher('aes-256-cbc', secretKey, iv)
        let d = decipher.update(s, 'hex', 'utf8')
        d += decipher.final('utf8')
        const r = JSON.parse(d)
        return r
    }

    static encrypt(form) {
        const s = JSON.stringify(form)
        const iv = '123456'
        const cipher = crypto.createCipher('aes-256-cbc', secretKey, iv)
        let c = cipher.update(s, 'utf8', 'hex')
        c += cipher.final('hex')
        return c
    }
}

module.exports = Session
