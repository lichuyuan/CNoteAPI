const Model = require('./main')

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
}

module.exports = Session