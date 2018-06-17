const Todo = require('./models/todo')

const {
    template,
    headerFromMapper,
    redirect,
    currentUser,
    loginRequired,
} = require('./routes')

const index = (request) => {
    const u = currentUser(request)
    const todoList = Todo.findAll('userId', u.id)
    console.log('todoList', todoList)
    const html = todoList.map(t =>
        `
        <h3>
            ${t.id} : ${t.title}
            <a href="/todo/edit?id=${t.id}">编辑</a>
            <a href="/todo/delete?id=${t.id}">删除</a>
        </h3>
        `
    ).join('')
    // 替换模板文件中的标记字符串
    let body = template('todo_index.html')
    body = body.replace('{{todos}}', html)

    // 下面几行可以改写为一条函数, 把 headers 放进函数中
    const headers = {
        'Content-Type': 'text/html',
    }
    const header = headerFromMapper(headers)
    const r = header + '\r\n' + body
    return r
}

const edit = (request) => {
    let body = template('todo_edit.html')
    const todoId = Number(request.query.id)
    const t = Todo.findBy('id', todoId)
    const u = currentUser(request)
    if (u.id === t.userId) {
        const todoTitle = t.title
        body = body.replace('{{todoId}}', todoId)
        body = body.replace('{{todoTitle}}', todoTitle)
        const headers = {
            'Content-Type': 'text/html',
        }
        const header = headerFromMapper(headers)
        const r = header + '\r\n' + body
        return r
    } else {
        return redirect('/todo')
    }
}

const add = (request) => {
    const form = request.form()
    const t = Todo.create(form)
    const u = currentUser(request)
    t.userId = u.id
    t.save()
    // 浏览器发送数据过来, 处理后重定向到首页
    // 浏览器在请求新首页的时候就能看到新增的数据了
    return redirect('/todo')
}

const update = (request) => {
    const form = request.form()
    Todo.update(form)
    return redirect('/todo')
}

const remove = (request) => {
    const todoId = Number(request.query.id)
    Todo.remove(todoId)
    return redirect('/todo')
}

const routeMapper = () => {
    const d = {
        '/todo': loginRequired(index),
        '/todo/add': add,
        '/todo/edit': edit,
        '/todo/update': loginRequired(update),
        '/todo/delete': remove,
    }
    return d
}

module.exports = routeMapper
