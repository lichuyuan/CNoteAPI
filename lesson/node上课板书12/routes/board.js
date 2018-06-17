const express = require('express')

const Board = require('../models/board')
const Model = Board
const { log } = require('../utils')
const {
    currentUser,
    loginRequired,
    adminRequired
} = require('./main')

// 使用 express.Router 可以创建模块化的路由
// 类似我们以前实现的形式
const main = express.Router()

const randomString = () => {
    const seed = 'asdfghjokpwefdsui3456789dfghjk67wsdcfvgbnmkcvb2e'
    let s = ''
    for (let i = 0; i < 16; i++) {
        const random = Math.random() * seed.length
        const index = Math.floor(random)
        s += seed[index]
    }
    return s
}


const csrfTokens = {}

main.get('/', adminRequired, (request, response) => {
    const ms = Model.all()
    log('debug ms', ms)
    const u = currentUser(request)
    const token = randomString()
    csrfTokens[token] = u.id
    const args = {
        boards: ms,
        token: token,
    }
    response.render('board/index.html', args)
})

main.get('/new', (request, response) => {
    response.render('board/new.html')
})

main.post('/add', (request, response) => {
    const form = request.body
    const m = Model.create(form)
    response.redirect('/board')
})

main.get('/delete/:id', (request, response) => {
    const id = Number(request.params.id)
    const u = currentUser(request)
    const token = request.query.token
    if (token in csrfTokens && csrfTokens[token] === u.id) {
        delete csrfTokens[token]
        const t = Model.remove(id)
        response.redirect('/board')
    } else {
        response.status(403).send('forbidden')
    }
})

main.get('/edit/:id', (request, response) => {
    const id = Number(request.params.id)
    const m = Model.get(id)
    log('model', m)
    const args = {
        board: m,
    }
    response.render('board/edit.html', args)
})

main.post('/update', (request, response) => {
    const form = request.body
    const m = Model.update(form)
    response.redirect('/board')
})

module.exports = {
    board: main
}
