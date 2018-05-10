const { mongoose, Model } = require('./main')
const {log} = require('../utils')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    task: String,
    completed: {
        type: Boolean,
        default: false,
    },
    user_id: String,
    completed_time: {
        type: Number,
        default: Date.now() + 24*60*60*1000,
    },
    level: {
        type: Number,
        default: 0, // 0 重要-紧急 1 重要-不紧急 2 不重要-紧急 3 不重要-不紧急
    },
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