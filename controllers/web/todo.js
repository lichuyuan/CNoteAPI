const Todo = require('../../models/todo')
const auth = require('../auth')

const index = async (req, res) => {
    const u = await auth.currentUser(req)
    const query = {
        'user_id': u.id
    }
    const todoList = await Todo.find(query)
    let t = []
    for (let i=0; i<=3; i++) {
        t.push({
            'level': i,
            'todos': todoList.filter((e) => e['level'] === i),
        })
    }
    const args = {
        todos: t,
        user: u,
    }
    res.render('todo/index.html', args)
}

module.exports = {
    index,
}