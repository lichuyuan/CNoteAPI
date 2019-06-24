const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

const schemaInstance = new Schema({
    remark: String, // 备注
    type: String, // 类型
    sysadmin_id: String,
    streamer_nickname: String,
    room_id: String,
    source: String,
    source_buyer_id: String,
    working_time: String,
    valid_time: Number,
    user_id: String,
    username: String,
    over_time: String,
    editable: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Number,
        default: 0,
    },
    room_manage_id: String,
    room_manage_yyuid: String,
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_time',
        updatedAt: 'updated_time'
    }
})

class RobotOrderStore extends Model {

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
        const _id = await super.get(id)
        return super.deleteOne({_id})
    }
}

schemaInstance.loadClass(RobotOrderStore)

schemaInstance.plugin(mongoosePaginate);
const RobotOrder = mongoose.model('RobotOrder', schemaInstance)

module.exports = RobotOrder
