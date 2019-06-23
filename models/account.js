const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

const schemaInstance = new Schema({
    remark: String,
    type: String,
    huya_nickname: String,
    huya_id: String,
    huya_yyuid: String,
    occupied_count: {
        type: Number,
        default: 0
    },
    editable: {
        type: Boolean,
        default: false
    },
    user_id: String,
    username: String,
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

schemaInstance.plugin(mongoosePaginate);

class AccountStore extends Model {

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

schemaInstance.loadClass(AccountStore)
const Account = mongoose.model('Account', schemaInstance)

module.exports = Account
