const express = require('express')

const Todo = require('../models/todo')
const { log } = require('../utils')
const {currentUser, loginRequired} = require('./main')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const router = express.Router()

router.get('/', loginRequired, async (request, response) => {
    const u = await currentUser(request)
    const todoList = await Todo.findAll('user_id', u.id)
    const args = {
        todos: todoList,
    }
    response.render('todo/index.html', args)
})

router.post('/add', async (request, response) => {
    const form = request.body
    const u = await currentUser(request)
    log('user', u)
    const t = await Todo.create(form, {
        user_id: u.id,
    })
    response.redirect('/todo')
})

router.get('/delete/:todoId', async (request, response) => {
    const todoId = request.params.todoId
    log('todo id ', todoId)
    const t = await Todo.remove(todoId)
    response.redirect('/todo')
})

router.get('/edit/:todoId', async (request, response) => {
    const id = request.params.todoId
    const t = await Todo.get(id)
    log('t', t)
    const args = {
        todo: t,
    }
    response.render('todo/edit.html', args)
})

router.post('/update', async (request, response) => {
    const form = request.body
    const t = await Todo.update(form)
    response.redirect('/todo')
})

router.get('/complete/:todoId', async (request, response) => {
    const id = request.params.todoId
    await Todo.complete(id)
    response.redirect('/todo')
})

module.exports = router

