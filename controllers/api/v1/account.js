const Account = require('../../../models/account')
// const Notebook = require('../../../models/notebook')
const auth = require('../../auth')

const all = async (req, res) => {
    const form = req.query

    const reg = new RegExp(form.value || "", 'i')

    const query = {
        $or: [
            {
                remark: {$regex: reg}
            },
            {
                huya_nickname: {$regex: reg}
            },
            {
                huya_id: {$regex: reg}
            }
        ]
    }
    const n = await Account.paginate(query, form)

    const dict = {
        success: true,
        data: n,
    }
    res.json(dict)
}

const allSimple = async (req, res) => {
    const n = await Account.all()

    const dict = {
        success: true,
        data: n,
    }
    res.json(dict)
}

const add = async (req, res) => {
    const form = req.body
    const u = await auth.currentUser(req)
    const t = await Account.create(form, {
        user_id: u.id,
        username: u.username
    })
    const dict = {
        success: true,
        data: t,
        message: '创建成功',
    }
    res.json(dict)
}

const update = async (req, res) => {
    const form = req.body
    const t = await Account.update(req.params.id, form)
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
    const t = await Account.remove(req.params.id)
    // const n = await Notebook.findOneAndUpdate({'_id': note.notebook_id}, { $inc: { note_counts: -1 }})
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
    allSimple
}
