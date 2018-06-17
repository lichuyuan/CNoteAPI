const Todo = require('./models/todo')

const {
    headerFromMapper,
    redirect,
    currentUser,
    error,
    loginRequired,
    htmlResponse,
} = require('./routes')

const {template, log} = require('./utils')

const index = (request) => {
    const u = currentUser(request)
    const todos = Todo.findAll('userId', u.id)
    // 替换模板文件中的标记字符串
    const body = template('todo_index.html', {
        todos: todos
    })
    return htmlResponse(body)
}

const add = (request) => {
    const u = currentUser(request)
    const form = request.form()
    const t = Todo.add(form, u.id)
    // 浏览器发送数据过来, 处理后重定向到首页
    // 浏览器在请求新首页的时候就能看到新增的数据了
    return redirect('/todo/all')
}

const remove = (request) => {
    const todoId = Number(request.query.id)
    Todo.remove(todoId)
    return redirect('/todo/all')
}

const edit = (request) => {
    const todoId = Number(request.query.id)
    const t = Todo.findBy('id', todoId)
    const body = template('todo_edit.html', {
        todo: t,
    })
    return htmlResponse(body)
}

const update = (request) => {
    const form = request.form()
    Todo.update(form)
    return redirect('/todo/all')
}

const routeMapper = () => {
    const d = {
        '/todo/all': loginRequired(index),
        '/todo/add': loginRequired(add),
        '/todo/delete': loginRequired(remove),
        '/todo/edit': loginRequired(edit),
        '/todo/update': loginRequired(update),
    }
    return d
}

module.exports = routeMapper
