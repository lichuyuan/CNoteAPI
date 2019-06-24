const express = require('express')

const multer = require('multer')
const config = require('../config')

const notebook = require('../controllers/api/v1/notebook')
const note = require('../controllers/api/v1/note')
const user = require('../controllers/api/v1/user')
const robotOrder = require('../controllers/api/v1/robot-order')
const vipOrder = require('../controllers/api/v1/vip-order')
const account = require('../controllers/api/v1/account')

const auth = require('../controllers/auth')
const { log } = require('../utils/common')

// 配置 multer 模块
// dest 表示文件上传之后保存的路径
const upload = multer({
    dest: config.uploadPath,
})

const router = express.Router()

router.get('/notebook', auth.loginRequired, notebook.all)
router.post('/notebook', auth.loginRequired, notebook.add)
router.patch('/notebook/:id', auth.loginRequired, notebook.update)
router.delete('/notebook/:id', auth.loginRequired, notebook.remove)

router.get('/note', auth.loginRequired, note.all)
router.post('/note', auth.loginRequired, note.add)
router.patch('/note/:id', auth.loginRequired, note.update)
router.delete('/note/:id', auth.loginRequired, note.remove)

router.get('/user/logout', auth.loginRequired, user.logout)
router.get('/user', user.getInfo)
router.get('/user/avatar/:filename', auth.loginRequired, user.avatar)
router.post('/user/avatar/update', auth.loginRequired, upload.single('avatar'), user.avatarUpdate)
router.post('/user/login', user.login)
router.post('/user/register', user.register)

router.get('/robot-order', auth.loginRequired, robotOrder.all)
router.post('/robot-order', auth.loginRequired, robotOrder.add)
router.patch('/robot-order/:id', auth.loginRequired, robotOrder.update)
router.delete('/robot-order/:id', auth.loginRequired, robotOrder.remove)

router.get('/vip-order', auth.loginRequired, vipOrder.all)
router.post('/vip-order', auth.loginRequired, vipOrder.add)
router.patch('/vip-order/:id', auth.loginRequired, vipOrder.update)
router.delete('/vip-order/:id', auth.loginRequired, vipOrder.remove)

router.get('/account', auth.loginRequired, account.all)
router.get('/account/simple', auth.loginRequired, account.allSimple)
router.post('/account', auth.loginRequired, account.add)
router.patch('/account/:id', auth.loginRequired, account.update)
router.delete('/account/:id', auth.loginRequired, account.remove)

router.get('/order/will/over', auth.loginRequired, account.all)

module.exports = router
