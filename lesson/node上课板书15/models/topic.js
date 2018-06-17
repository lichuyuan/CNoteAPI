const {mongoose, Model} = require('./main')
const {log} = require('../utils')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: String,
    completed: {
        type: Boolean,
        default: false,
    },
    user_id: String,
    created_time: {
        type: Number,
        default: Date.now(),
    },
    updated_time: {
        type: Number,
        default: Date.now(),
    },
})

class TodoStore extends Model {
    static async guest() {
        const o = {
            id: -1,
            username: '游客',
        }
        const u = new User(o)
        return u
    }

    static async complete(id) {
        const t = await Todo.get(id)
        t.completed = !t.completed
        t.save()
        return t
    }

    static async update(form) {
        const id = form.id
        const t = await this.get(id)
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
    }
}


todoSchema.loadClass(TodoStore)
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo

// 先写 model 的意思是说提前把 model 部分写好
// 然后进行测试, 因为 model 测试很方便
const test = () => {
    // 测试 topic 的增删改查
}