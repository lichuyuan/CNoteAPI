const Model = require('./main')

class Todo extends Model {
    // 针对我们的数据 TODO
    // 要做 4 件事情
    // C create 创建数据
    // R read 读取数据
    // U update 更新数据
    // D delete 删除数据

    // Todo.create() 来创建一个 todo
    constructor(form={}, userId=-1) {
        super(form)
        this.task = form.task || ''
        // 和别的数据的关联的方式, 用 userId 表明拥有它的 user 实例
        this.userId = 'userId' in form ? form.userId : userId
    }

    static add(form, userId) {
        form.userId = userId
        Todo.create(form)
    }

    static update(form) {
        // todo 放进 model
        const todoId = form.id
        const t = this.get(todoId)
        const validNames = [
            'task',
        ]
        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                t[k] = form[k]
            }
        })
        t.save()
    }
}

module.exports = Todo
