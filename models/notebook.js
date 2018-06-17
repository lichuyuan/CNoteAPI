const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')

const Schema = mongoose.Schema

const notebookSchema = new Schema({
    title: String,
    user_id: String,
    created_time: {
        type: Number,
        default: Date.now(),
    },
    updated_time: {
        type: Number,
        default: Date.now(),
    },
    note_counts: {
        type: Number,
        default: 0,
    },
}, { versionKey: false })

class NotebookStore extends Model {

    static async update(id, form) {
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
        return t
    }
    static async removeOne(id) {
        const n = await super.get(id)
        log(n)
        if (n.note_counts === 0) {
            const query = {
                _id: id,
            }
            return super.deleteOne(query)
        } else {
            return null
        }
    }

}

notebookSchema.loadClass(NotebookStore)
const Notebook = mongoose.model('Notebook', notebookSchema)

module.exports = Notebook