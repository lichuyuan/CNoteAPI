const express = require('express')

const Model = require('../../models/todo')
const { log } = require('../../utils')
const { currentUser, loginRequired } = require('../main')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const router = express.Router()

router.get('/', async (request, response) => {
    const u  = await currentUser(request)
    const qs = {
        'user_id': u.id,
        'level': 1,
    }
    const Models = await Model.findByQuerys(qs)
    const dict = {
        success: true,
        data: Models,
        message: '',
    }
    response.json(dict)
})

router.post('/add', async (request, response) => {
    const form = request.body
    const u = await currentUser(request)
    const t = await Model.create(form, {
        user_id: u.id,
    })
    const dict = {
        success: true,
        data: t,
        message: '创建成功',
    }
    response.json(dict)
})

router.post('/update', async (request, response) => {
    const form = request.body
    const t = await Model.update(form)
    const dict = {
        success: true,
        data: t,
        message: '更新成功',
    }
    response.json(dict)
})

module.exports = router