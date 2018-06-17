const express = require('express')
const movies = require('./data')

const router = express.Router()

router.get('/all', (request, response) => {
    const r = {
        success: true,
        data: movies,
        message: ''
    }
    response.json(r)
})

module.exports = router