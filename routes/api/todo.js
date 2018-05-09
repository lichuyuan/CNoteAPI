const express = require('express')

const Todo = require('../../models/todo')
const { log } = require('../../utils')
const {currentUser, loginRequired} = require('../main')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const router = express.Router()

router.get('/', loginRequired, async (request, response) => {
    const todoList = await Todo.all()
    const dict = {
        success: true,
        data: todoList,
        message: '',
    }
    response.json(dict)
})

module.exports = router