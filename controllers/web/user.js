const Todo = require('../../models/todo')
const auth = require('../auth')

const login = (req, res) => {
    const next_url = req.query.next_url
    res.render('user/login.html', {
        next_url: next_url,
    })
}

const logout = (req, res) => {
    req.session = null
    res.redirect('/')
}

const register = (req, res) => {
    res.render('user/register.html')
}

const profile = async (req, res) => {
    const u = await auth.currentUser(req)
    const args = {
        user: u,
    }
    res.render('user/profile.html', args)
}

const avatar = (req, res) => {
    const path = require('path')
    // 头像所在的路径, 我们配置的时候使用的时候相对路径
    const filename = req.params.filename
    const p = uploadPath + filename
    // res.sendFile 的参数是一个绝对路径
    // 使用 path.resolve 把头像的路径转换成绝对路径
    const absolutePath = path.resolve(p)
    // 实际上图片也是发一个请求, 我们最初的课程是按照 /static?file 的形式来处理的
    // 常见的验证码是一张图片, 处理方式也是这种
    // /captcha?random=45678
    // 点击图片的时候会换一张验证码, 实际上就是拿到前端传过来的随机数,
    // 然后生成一个新的随机数, 最后写入到图片中
    res.sendFile(absolutePath)
}

module.exports = {
    login,
    logout,
    register,
    profile,
    avatar,
}