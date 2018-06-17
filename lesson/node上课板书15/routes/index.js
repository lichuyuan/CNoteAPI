const express = require('express')

const User = require('../models/user')
const { log } = require('../utils')
const { currentUser } = require('./main')

const router = express.Router()

router.get('/', async (request, response) => {
    const userList = await User.all()
    const u = await currentUser(request)
    const args = {
        users: userList,
        user: u,
    }
    response.render('index/index.html', args)
})

router.get('/login', (request, response) => {
    const next_url = request.query.next_url
    response.render('index/login.html', {
        next_url: next_url,
    })
})

router.post('/login', async (request, response) => {
    const form = request.body
    const b = await User.validateLogin(form)
    if (b) {
        const u = await User.findBy('username', form.username)
        // 直接指定 request.session 的 key, 然后通过这个 key 来获取设置的值
        request.session.uid = u.id
        const next_url = form.next_url || '/'
        response.redirect(next_url)
    } else {
        request.session.flash = {
            message: '用户名或者密码错误',
        }
        response.redirect('/login')
    }
})

router.get('/register', (request, response) => {
    response.render('index/register.html')
})

router.post('/register', async (request, response) => {
    const form = request.body
    const u = await User.register(form)
    if (u === null) {
        request.session.flash = {
            message: '用户名已存在或者用户名密码长度不对',
        }
        response.redirect('/register')
    } else {
        response.redirect('/')
    }
})

router.get('/logout', (request, response) => {
    // 注销登录的时候, 将 session 清空就可以了
    request.session = null
    response.redirect('/')
})

router.get('/hash', (request, response) => {
    response.render('hash_demo.html')
})

router.get('/component', (request, response) => {
    response.render('component_demo.html')
})

module.exports = router

