const Model = require('./main')

class Topic extends Model {
    constructor(form={}) {
        super(form)
        // 浏览数量
        this.views = form.views || 0
        this.title = form.title || ''
        this.content = form.content || ''
        this.user_id = Number(form.user_id || -1)
        this.board_id = Number(form.board_id || -1)
    }

    static detail(id) {
        const m = super.get(id)
        console.log('m', m)
        m.views += 1
        m.save()
        return m
    }

    static allList(board_id) {
        let ms = []
        if (board_id === -1) {
            ms = super.all()
        } else {
            ms = super.findBy('board_id', board_id)
        }
        return ms
    }

    user() {
        const User = require('./user')
        const u = User.get(this.user_id)
        return u
    }

    replies() {
        const Reply = require('./reply')
        const ms = Reply.findAll('topic_id', this.id)
        return ms
    }

    board() {
        const Board = require('./board')
        const b = Board.get(this.board_id)
        return b
    }
}

module.exports = Topic
