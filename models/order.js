const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')

const Schema = mongoose.Schema

const schemaInstance = new Schema({
    remark: String,
    type: String,
    sysadmin_id: Number,
    streamer_nickname: String,
    room_id: Number,
    source: String,
    source_buyer_id: String,
    working_time: String,
    valid_time: Number,
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

class OrderStore extends Model {

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

schemaInstance.loadClass(OrderStore)
const Order = mongoose.model('Order', schemaInstance)

module.exports = Order
