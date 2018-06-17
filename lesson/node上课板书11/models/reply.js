const Model = require('./main')

class Reply extends Model {
    constructor(form={}) {
        super(form)
        this.content = form.content || ''
        this.topic_id = Number(form.topic_id || -1)
        this.user_id = Number(form.user_id || -1)
    }

    user() {
        const User = require('./user')
        const u = User.get(this.user_id)
        console.log('user', u, this)
        return u
    }
}

module.exports = Reply
