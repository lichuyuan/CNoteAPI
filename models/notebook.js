const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')

const Schema = mongoose.Schema

const notebookSchema = new Schema({
    title: String,
    user_id: String,
    note_counts: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_time',
        updatedAt: 'updated_time'
    }
})

class NotebookStore extends Model {

    static async update(id, form) {
        const t = await this.get(id)
        const frozonKeys = [
            'id',
        ]
        Object.keys(form).forEach(k => {
            if (!frozonKeys.includes(k)) {
                t[k] = form[k]
            }
        })

        t.save()
        return t
    }
    static async removeOne(id) {
        const n = await super.get(id)
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