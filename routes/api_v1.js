const express = require('express')

const multer = require('multer')
const config = require('../config')

const notebook = require('../controllers/api/v1/notebook')
const note = require('../controllers/api/v1/note')
const user = require('../controllers/api/v1/user')
const order = require('../controllers/api/v1/order')

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

router.get('/order', auth.loginRequired, order.all)
router.post('/order', auth.loginRequired, order.add)

module.exports = router
