const { mongoose, Model } = require('./main')
const { log } = require('../utils/common')

const Schema = mongoose.Schema

const schemaInstance = new Schema({
    remark: String,
    type: String,
    huya_nickname: String,
    huya_id: String,
    huya_yyuid: String,
    register_user_id: String,
    usage_count: Number,
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
        const note = await super.get(id)
        return super.deleteOne(query)
    }
}

schemaInstance.loadClass(AccountStore)
const Account = mongoose.model('Account', schemaInstance)

module.exports = Account
