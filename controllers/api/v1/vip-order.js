const VipOrder = require('../../../models/vip-order')
// const Notebook = require('../../../models/notebook')
const Account = require('../../../models/account')
const auth = require('../../auth')
const moment = require('moment')

const all = async (req, res) => {
    const form = req.query
    const reg = new RegExp(form.value || "", 'i')

    const query = {
        $or: [
            {
                remark: {$regex: reg}
            },
            {
                streamer_nickname: {$regex: reg}
            },
            {
                room_id: {$regex: reg}
            }
        ]
    }
    const n = await VipOrder.paginate(query, form)
    const dict = {
        success: true,
        data: n,
    }
    res.json(dict)
}

const add = async (req, res) => {
    const form = req.body
    const u = await auth.currentUser(req)
    form.over_time = moment(form.working_time).add(form.valid_time, 'h').format()
    const t = await VipOrder.create(form, {
        user_id: u.id,
        username: u.username
    })
    for (let a of form.occupied_account) {
        let n = await Account.findOneAndUpdate({'_id': a}, { $inc: { occupied_count: 1 }})
    }
    const dict = {
        success: true,
        data: t,
        message: '创建成功',
    }
    res.json(dict)
}

const update = async (req, res) => {
    const form = req.body
    const t = await VipOrder.update(req.params.id, form)
    let dict
    if (form.deleted === 1) {
        dict = {
            success: true,
            message: '已移至回收站',
        }
    } else {
        dict = {
            success: true,
            data: t,
            message: '更新成功',
        }
    }
    res.json(dict)
}

const remove = async (req, res) => {
    const id = req.params.id
    const order = VipOrder.get(id)
    for (let a of order.occupied_account) {
        let n = await Account.findOneAndUpdate({'_id': a}, { $inc: { occupied_count: -1 }})
    }
    const t = await VipOrder.remove(id)
    const dict = {
        success: true,
        message: '删除成功',
    }
    res.json(dict)
}

module.exports = {
    all,
    add,
    update,
    remove,
}
