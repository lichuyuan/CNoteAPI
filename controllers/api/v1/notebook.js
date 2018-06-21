const Notebook = require('../../../models/notebook')
const auth = require('../../auth')

const all = async (req, res) => {
    const u = await auth.currentUser(req)
    const q = req.query
    q.user_id = u.id
    const n = await Notebook.find(q)
    const dict = {
        success: true,
        data: n,
    }
    res.json(dict)
}

const add = async (req, res) => {
    const form = req.body
    const u = await auth.currentUser(req)
    const t = await Notebook.create(form, {
        user_id: u.id,
    })
    const dict = {
        success: true,
        data: t,
        message: '创建成功',
    }
    res.json(dict)
}

const update = async (req, res) => {
    const notebookId = req.params.id
    const form = req.body
    const t = await Notebook.update(notebookId, form)
    const dict = {
        success: true,
        data: t,
        message: '更新成功',
    }
    res.json(dict)
}

const remove = async (req, res) => {
    const notebookId = req.params.id
    const t = await Notebook.removeOne(notebookId)
    if (t === null) {
        const dict = {
            success: false,
            message: '当前笔记本不为空，不能删除，请清空笔记后再尝试操作',
        }
        res.json(dict)
    } else {
        const dict = {
            success: true,
            message: '删除成功',
        }
        res.json(dict)
    }
}

module.exports = {
    all,
    add,
    update,
    remove,
}