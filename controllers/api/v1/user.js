const User = require('../../../models/user')
const auth = require('../../auth')

const { log } = require('../../../utils/common')

const avatarUpdate = async (req, res) => {
    // upload.single 获取上传的文件并且处理
    // req.file 是处理之后的信息
    const u = await auth.currentUser(req)
    const avatar = req.file
    // filename 是保存在 dest 中的文件名, 这里我们不使用用户上传的文件名, 直接用 multer 处理之后的名字
    // 因为用户上传的文件名从安全角度来看是有风险
    u.avatar = avatar.filename
    const t = await User.update(u)
    const dict = {
        success: true,
        data: t,
        message: '上传成功',
    }
    res.json(dict)
}

const login = async (req, res) => {
    const form = req.body
    const b = await User.validateLogin(form)
    if (b) {
        const u = await User.findOne({ username: form.username })
        // 直接指定 req.session 的 key, 然后通过这个 key 来获取设置的值
        req.session.uid = u.id
        const dict = {
            success: true,
            data: u,
            message: '登录成功',
        }
        res.json(dict)
    } else {
        const dict = {
            success: false,
            data: {},
            message: '用户名或密码错误',
        }
        res.json(dict)
    }
}

const register = async (req, res) => {
    const form = req.body
<<<<<<< HEAD
    const u = await User.validateRegister(form)
=======
    log(form, req)
    const u = await User.register(form)
>>>>>>> 74f6450f3887fbee9d482b1a98d673fb0bb56f92
    if (u === null) {
        const dict = {
            success: false,
            data: {},
            message: '用户名已存在或者用户名密码长度不对',
        }
        res.json(dict)
    } else {
        req.session.uid = u.id
        const dict = {
            success: true,
            data: u,
            message: '注册成功',
        }
        res.json(dict)
    }
}

const logout = (req, res) => {
    req.session = null
    const dict = {
        success: true,
        message: '注销成功',
    }
    res.json(dict)
}

const getInfo = async (req, res) => {
    const u = await auth.currentUser(req)
    let dict
    if (u === null) {
        dict = {
            success: false,
            message: '未登录',
        }
    } else {
        dict = {
            success: true,
            data: u,
        }
    }
    res.json(dict)
}

module.exports = {
    avatarUpdate,
    login,
    register,
    logout,
    getInfo
}