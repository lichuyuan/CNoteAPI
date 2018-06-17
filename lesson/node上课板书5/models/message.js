const Model = require('./main')

class Message extends Model {
    constructor(form={}) {
        super(form)
        this.author = form.author || ''
        this.content = form.content || ''
    }
}

module.exports = Message
