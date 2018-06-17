const Model = require('./main')

class Topic extends Model {
    constructor(form={}) {
        super(form)
        // 浏览数量
        this.views = 0
        this.title = form.title || ''
        this.content = form.content || ''
        this.user_id = Number(form.user_id || -1)
    }

    static detail(id) {
        const m = super.get(id)
        m.views += 1
        m.save()
        return m
    }

    replies() {
        // 如果在外面 require Reply 会有一个循环的问题
        // 所以就放在函数里面了
        const Reply = require('./reply')
        const ms = Reply.findAll('topic_id', this.id)
        return ms
    }
}

module.exports = Topic
