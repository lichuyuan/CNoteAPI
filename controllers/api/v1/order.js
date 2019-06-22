const Order = require('../../../models/order')
// const Notebook = require('../../../models/notebook')
const auth = require('../../auth')

const all = async (req, res) => {
    const n = await Order.all()
    const dict = {
        success: true,
        data: n,
    }
    res.json(dict)
}

const add = async (req, res) => {
    const form = req.body
    const u = await auth.currentUser(req)
    const t = await Order.create(form, {
        user_id: u.id,
    })
    // const n = await Notebook.findOneAndUpdate({'_id': form.notebook_id}, { $inc: { note_counts: 1 }})
    const dict = {
        success: true,
        data: t,
        message: '创建成功',
    }
    res.json(dict)
}

const update = async (req, res) => {
    const noteId = req.params.id
    const form = req.body
    const t = await Note.update(noteId, form)
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
    const noteId = req.params.id
    const note = await Note.get(noteId)
    const t = await Note.remove(noteId)
    const n = await Notebook.findOneAndUpdate({'_id': note.notebook_id}, { $inc: { note_counts: -1 }})
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
