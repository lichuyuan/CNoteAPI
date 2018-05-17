const express = require('express')

const multer = require('multer')
// 文件上传之后保存的路径, 这个路径希望做成可以配置的, 所以就写入到 config 中
const { uploadPath } = require('../config')

const User = require('../models/user')
const { log } = require('../utils')
const { currentUser, loginRequired } = require('./main')

// 配置 multer 模块
// dest 表示文件上传之后保存的路径
const upload = multer({
    dest: uploadPath,
})

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
    log(next_url)
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

router.get('/base', (request, response) => {
    response.render('base.html')
})

router.get('/avatar', async (request, response) => {
    const u = await currentUser(request)
    log(u)
    const args = {
        user: u,
    }
    response.render('avatar.html', args)
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

// 用户上传头像的路由, 这里会依次调用三个处理函数
router.post('/upload/avatar', loginRequired, upload.single('avatar'), async (request, response) => {
    // upload.single 获取上传的文件并且处理
    // request.file 是处理之后的信息
    log('request file', request.file)
    const u = await currentUser(request)
    const avatar = request.file
    // filename 是保存在 dest 中的文件名, 这里我们不使用用户上传的文件名, 直接用 multer 处理之后的名字
    // 因为用户上传的文件名从安全角度来看是有风险
    log('u', u)
    u.avatar = avatar.filename
    const t = await User.update(u)
    const dict = {
        success: true,
        data: t,
        message: '上传成功',
    }
    response.json(dict)
})

// 获取头像的路由
router.get('/avatar/:filename', (request, response) => {
    const path = require('path')
    // 头像所在的路径, 我们配置的时候使用的时候相对路径
    const filename = request.params.filename
    const p = uploadPath + filename
    // response.sendFile 的参数是一个绝对路径
    // 使用 path.resolve 把头像的路径转换成绝对路径
    const absolutePath = path.resolve(p)
    // 实际上图片也是发一个请求, 我们最初的课程是按照 /static?file 的形式来处理的
    // 常见的验证码是一张图片, 处理方式也是这种
    // /captcha?random=45678
    // 点击图片的时候会换一张验证码, 实际上就是拿到前端传过来的随机数,
    // 然后生成一个新的随机数, 最后写入到图片中
    response.sendFile(absolutePath)
})

module.exports = router

