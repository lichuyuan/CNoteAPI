const Todo = require('../../../models/todo')
const auth = require('../../auth')

const add = async (req, res) => {
    const form = req.body
    const u = await auth.currentUser(req)
    const t = await Todo.create(form, {
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
    const form = req.body
    const t = await Todo.update(form)
    const dict = {
        success: true,
        data: t,
        message: '更新成功',
    }
    res.json(dict)
}

module.exports = {
    add,
    update,
}