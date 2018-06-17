const Model = require('./main')

const { log } = require('../utils')


class Todo extends Model {
    constructor(form={}) {
        super(form)
        this.title = form.title || ''
        this.completed = form.completed || false
        // this.user_id = form.user_id
    }

    static add(form, user_id) {
        form.user_id = user_id
        Todo.create(form)
    }

    static update(form) {
        const id = Number(form.id)
        const t = this.get(id)

        const validNames = [
            'title',
        ]
        // const frozenKeys = [
        //     'id',
        //     'created_time',
        // ]
        // log('form and t', form ,t)
        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                t[k] = form[k]
            }
        })

        t.updated_time = Date.now()
        t.save()
        return t
    }

    static complete(id, completed) {
        const t = Todo.get(id)
        t.completed = completed
        t.updated_time = Date.now()
        t.save()
        return t
    }
}

// 把 Model 提取出来之后, 就可以方便地对 model 进行测试
const testAdd = () => {
    const form = {
        title: '打豆豆',
    }
    const t = Todo.create(form)
    t.save()
}

const testDelete = () => {
    const form = {
        title: 'water',
        id: 0,
    }
    const t = Todo.create(form)
    t.remove(form.id)
}

const testUpdate = () => {
    const form = {
        title: '睡觉',
        id: 1,
    }
    const t = Todo.findOne('id', form.id)
    t.title = form.title
    t.completed = false
    t.save()
}

const test = () => {
    // testAdd()
    // testDelete()
    testUpdate()
}

if (require.main === module) {
    test()
}

module.exports = Todo