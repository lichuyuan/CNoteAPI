const express = require('express')

const multer = require('multer')
const config = require('../config')

const todo = require('../controllers/api/v1/todo')
const user = require('../controllers/api/v1/user')

const auth = require('../controllers/auth')
const { log } = require('../utils/common')

// 配置 multer 模块
// dest 表示文件上传之后保存的路径
const upload = multer({
    dest: config.uploadPath,
})

const router = express.Router()

router.post('/todo/add', todo.add)
router.post('/todo/update', todo.update)

router.post('/user/avatar/update', auth.loginRequired, upload.single('avatar'), user.avatarUpdate)
router.post('/user/register', user.register)

module.exports = router