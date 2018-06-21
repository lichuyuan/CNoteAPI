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
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_time',
        updatedAt: 'updated_time'
    }
})

class NoteStore extends Model {

    static async update(id, form) {
        const note = await this.get(id)
        const frozonKeys = [
            'id',
        ]
        Object.keys(form).forEach(k => {
            if (!frozonKeys.includes(k)) {
                note[k] = form[k]
            }
        })

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