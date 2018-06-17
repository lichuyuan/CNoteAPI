const express = require('express')

const User = require('../models/user')
const { log } = require('../utils')
const { currentUser, htmlResponse } = require('./main')

const index = express.Router()

index.get('/', (request, response) => {
    const userList = User.all()
    const u = currentUser(request)
    if (request.session.visit !== undefined) {
        request.session.visit += 1
    } else {
        request.session.visit = 1
    }
    htmlResponse(response, 'index/index.html', {
        users: userList,
        user: u,
        counter: request.session.visit,
    })
})

index.get('/login', (request, response) => {
    const args = {
        next_url: request.query.next_url || ''
    }
    htmlResponse(response, 'index/login.html', args)
})

index.post('/login', (request, response) => {
    const form = request.body
    log('User.validateLogin(form)', User.validateLogin(form))
    if (User.validateLogin(form)) {
        const u = User.findBy('username', form.username)
        // 直接指定 request.session 的 key, 然后通过这个 key 来获取设置的值
        request.session.uid = u.id
        const nextUrl = form.next_url || '/'
        response.redirect(nextUrl)
    } else {
        request.session.flash = {
            message: '用户名或者密码错误',
        }
        response.redirect('/login')
    }
})

index.get('/register', (request, response) => {
    htmlResponse(response, 'index/register.html')
})

index.post('/register', (request, response) => {
    const form = request.body
    const u = User.register(form)
    if (u === null) {
        request.session.flash = {
            message: '用户名已存在或者用户名密码长度不对',
        }
        response.redirect('/register')
    } else {
        response.redirect('/')
    }
})

index.get('/logout', (request, response) => {
    // 注销登录的时候, 将 session 清空就可以了
    request.session = null
    response.redirect('/')
})

module.exports = index
