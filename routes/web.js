const express = require('express')

const site = require('../controllers/web/site')
const user = require('../controllers/web/user')

const auth = require('../controllers/auth')

const router = express.Router()

router.get('/', site.index)

router.get('/base', site.base)

router.get('/user/avatar/:filename', auth.loginRequired, user.avatar)

module.exports = router