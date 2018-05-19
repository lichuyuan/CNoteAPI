const express = require('express')

const site = require('../controllers/web/site')
const todo = require('../controllers/web/todo')
const user = require('../controllers/web/user')

const auth = require('../controllers/auth')
const { log } = require('../utils/common')

const router = express.Router()

router.get('/', site.index)

router.get('/base', site.base)

router.get('/todo', auth.loginRequired, todo.index)

router.get('/user/login', user.login)
router.get('/user/logout', user.logout)
router.get('/user/register', user.register)
router.get('/user/profile', auth.loginRequired, user.profile)
router.get('/user/avatar', user.avatar)

module.exports = router