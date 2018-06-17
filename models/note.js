const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: String,
    content: String,
    notebook_id: String,
    user_id: String,
    deleted: {
        type: Number,
        default: 0,
    },
    created_time: {
        type: Number,
        default: Date.now(),
    },
    updated_time: {
        type: Number,
        default: Date.now(),
    },
}, { versionKey: false })

class NoteStore extends Model {

    static async update(id, form) {
        const note = await this.get(id)
        const frozonKeys = [
            'id',
            'created_time',
        ]
        Object.keys(form).forEach(k => {
            if (!frozonKeys.includes(k)) {
                note[k] = form[k]
            }
        })

        note.updated_time = Date.now()
        note.save()
        return note
    }
    static async removeOne(id) {
        const note = await super.get(id)
        return super.deleteOne(query)
    }
}

noteSchema.loadClass(NoteStore)
const Note = mongoose.model('Note', noteSchema)

module.exports = Note