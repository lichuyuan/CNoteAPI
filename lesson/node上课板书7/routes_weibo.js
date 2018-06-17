const Weibo = require('./models/weibo')
const Comment = require('./models/comment')
const User = require('./models/user')

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
    let authorId = Number(request.query.userId || -1)
    const u = currentUser(request)
    if (authorId === -1) {
        authorId = u.id
    }
    const weibos = Weibo.findAll('userId', authorId)
    // 替换模板文件中的标记字符串
    const body = template('weibo_index.html', {
        weibos: weibos,
        user: u,
    })
    return htmlResponse(body)
}

const create = (request) => {
    const body = template('weibo_new.html')
    return htmlResponse(body)
}

const add = (request) => {
    const u = currentUser(request)
    const form = request.form()
    const w = Weibo.create(form)
    w.userId = u.id
    w.save()
    return redirect('/weibo/index')
}

const remove = (request) => {
    const weiboId = Number(request.query.id)
    Weibo.remove(weiboId)
    return redirect('/weibo/index')
}

const edit = (request) => {
    const weiboId = Number(request.query.id || -1)
    const w = Weibo.get(weiboId)
    const body = template('weibo_edit.html', {
        weibo: w,
    })
    return htmlResponse(body)
}

const update = (request) => {
    const u = currentUser(request)
    const form = request.form()
    const content = form.content || ''
    const weiboId = Number(form.id || -1)
    const w = Weibo.get(weiboId)
    w.content = content
    w.save()
    return redirect('/weibo/index')
}

const commentAdd = (request) => {
    const u = currentUser(request)
    const form = request.form()
    const c = Comment.create(form)
    c.userId = u.id
    c.save()
    const weiboId = Number(form.weiboId)
    const w = Weibo.get(weiboId)
    return redirect(`/weibo/index?userId=${w.userId}`)
}

const routeMapper = () => {
    const d = {
        '/weibo/index': loginRequired(index),
        '/weibo/new': loginRequired(create),
        '/weibo/add': loginRequired(add),
        '/weibo/delete': loginRequired(remove),
        '/weibo/edit': loginRequired(edit),
        '/weibo/update': loginRequired(update),
        // 评论功能
        '/comment/add': loginRequired(commentAdd),
    }
    return d
}

module.exports = routeMapper
