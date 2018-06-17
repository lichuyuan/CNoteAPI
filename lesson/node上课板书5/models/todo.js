const Model = require('./main')

class Todo extends Model {
    constructor(form={}) {
        super(form)
        this.title = form.title || ''
        this.userId = 'userId' in form ? form.userId : -1
    }

    static update(form) {
        const todoId = Number(form.id || -1)
        const t = Todo.findBy('id', todoId)
        t.title = form.title
        t.save()
    }
}

module.exports = Todo
