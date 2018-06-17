const Model = require('./main')
const Todo = require('./todo')

class User extends Model {
    constructor(form={}) {
        // 继承的时候, 要先调用 super 方法, 才可以使用 this, 这里的 super 就是套路
        super(form)
        // User 类定义两个属性
        this.username = form.username || ''
        this.password = form.password || ''
    }

    // 校验登录的逻辑
    static validateLogin(form) {
        const {username, password} = form
        const u = this.findBy('username', username)
        return u !== null && u.password === password
    }

    // 校验注册的逻辑
    static validateRegister(form) {
        const {username, password} = form
        const validUsername = username.length > 2
        const validPassword = password.length > 2
        const uniqueUsername = User.findBy('username', username) === null
        return validUsername && validPassword && uniqueUsername
    }

    static guest() {
        const o = {
            id: -1,
            username: '游客',
        }
        const u = this.create(o)
        return u
    }

    todos() {
        const todos = Todo.all()
        const ts = todos.filter(t => t.userId === this.id)
        return ts
    }
}

module.exports = User
