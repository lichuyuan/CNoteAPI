const express = require('express')

const Topic = require('../models/topic')
const Model = Topic
const { log } = require('../utils')
const {
    currentUser,
    loginRequired,
    htmlResponse,
} = require('./main')

const topic = express.Router()

topic.get('/', (request, response) => {
    const ms = Model.all()
    const args = {
        topics: ms,
    }
    htmlResponse(response, 'topic/index.html', args)
})

topic.get('/detail/:id', (request, response) => {
    const id = Number(request.params.id)
    const m = Topic.detail(id)
    const args = {
        topic: m,
    }
    htmlResponse(response, 'topic/detail.html', args)
})

topic.get('/new', (request, response) => {
    htmlResponse(response, 'topic/new.html')
})

topic.post('/add', loginRequired, (request, response) => {
    const u = currentUser(request)
    const form = request.body
    const m = Model.create(form, {
        user_id: u.id,
    })
    response.redirect('/topic')
})

topic.get('/delete/:id', (request, response) => {
    const id = Number(request.params.id)
    const t = Model.remove(id)
    response.redirect('/todo')
})

topic.get('/edit/:id', (request, response) => {
    const id = Number(request.params.id)
    const m = Model.get(id)
    const args = {
        topic: m,
    }
    htmlResponse(response, 'todo/edit.html', args)
})

topic.post('/update', (request, response) => {
    const form = request.body
    const m = Model.update(form)
    response.redirect('/todo')
})

module.exports = topic
