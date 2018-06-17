const express = require('express')

const Todo = require('../models/todo')
const { log } = require('../utils')
const { jsonResponse } = require('./main')

const router = express.Router()

router.get('/all', async (request, response) => {
    const ms = await Todo.all()
    const dict = {
        success: true,
        data: ms,
        message: '',
    }
    jsonResponse(request, response, dict)
})

module.exports = router
