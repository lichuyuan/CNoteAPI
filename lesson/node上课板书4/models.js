// 引入模块
const fs = require('fs')
const log = require('./utils')

// 一个辅助函数, 确保要操作的文件已经存在
// 如果不存在就直接创建这个文件, 这样在调用的时候不会报错
const ensureExists = (path) => {
    const exists = fs.existsSync(path)
    if (!exists) {
        // 因为保存的数据都是 json 格式的, 所以在初始化文件的时候
        // 会写入一个空数组
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}

// 将数据(object 或者 array)写入到文件中, 相当于持久化保存数据
// data 是 object 或者 array
// path 是 保存文件的路径
const save = (data, path) => {
    // 默认情况下使用 JSON.stringify 返回的是一行数据
    // 开发的时候不利于读, 所以格式化成缩进 2 个空格的形式
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

// 从文件中读取数据, 并且转成 JSON 形式(即 object 或者 array)
// path 是保存文件的路径
const load = (path) => {
    // 指定 encoding 参数
    const options = {
        encoding: 'utf8',
    }
    // 读取之前确保文件已经存在, 这样不会报错
    ensureExists(path)
    // 上节课提到如果指定了 encoding, readFileSync 返回的就不是 buffer, 而是字符串
    const s = fs.readFileSync(path, options)
    const data = JSON.parse(s)
    return data
}

// 定义一个 Model 类来处理数据相关的操作
// Model 是基类, 可以被其他类继承
class Model {
    // 加了 static 关键字的方法是静态方法
    // 直接用 类名.方法名() 的形式调用
    // 这里的类名是 Model, 所以调用的方式就是 Model.dbPath()
    // dbPath 方法返回 db 文件的路径
    static dbPath() {
        // 静态方法中的 this 指的是类
        // this.name 指的是类名, 类名是一个字符串 'Model'
        // 文件名一般来说建议全小写, 所以这里将名字换成了小写
        const classname = this.name.toLowerCase()
        // db 的文件名通过这样的方式与类名关联在一起
        const path = `${classname}.txt`
        return path
    }

    // 这个函数是用来获取一个类的所有实例
    // 用法如下: 类名.all()
    static all() {
        // 先获取文件路径
        const path = this.dbPath()
        // 打开文件, 获取数据
        // 因为使用的 json 格式存储数据, 而且我们初始化时用的是数组,
        // 之后保存也用的是数组
        // 所以 models 是一个数组
        const models = load(path)
        // map 是 es5 里新增的方法, 可以方便地遍历数组
        // map 是用一个旧数组生成一个新数组
        const ms = models.map((item) => {
            const cls = this
            const instance = cls.create(item)
            return instance
        })
        log('models', models, ms)
        return ms
    }

    static findBy(key, value) {
        const all = this.all()
        let model = null
        // all.forEach((m) => {
        //     if (m[key] === value) {
        //         model = m
        //         return false
        //     }
        // })
        for (let m of all) {
            if (m[key] === value) {
                model = m
                break
            }
        }
        return model
    }

    static findAll(key, value) {
        const all = this.all()
        let model = all.filter(k => k[key] === value)
        return model
    }

    static create(form={}) {
        const cls = this
        const instance = new cls(form)
        return instance
    }

    // save 前面没有 static 关键字, 是实例方法或者原型方法
    // 调用方式是 实例.方法()
    // save 函数的作用是把 Model 的一个实例保存到文件中
    // save() {
    //     // 实例方法中的 this 指向的是实例本身, 也就是 new 出来的那个对象
    //     // this.constructor 是指类
    //     const cls = this.constructor
    //     // 先获取 Model 的所有实例, 是一个数组
    //     const models = cls.all()
    //     // 然后把当前实例添加到 models 中, 接着保存到文件中
    //     models.push(this)
    //     const path = cls.dbPath()
    //     // 这个 save 函数是 save 文件的函数, 而不是当前这个实例方法
    //     save(models, path)
    // }
    save() {
        const cls = this.constructor
        const models = cls.all()
        //
        // log('m', this, this.id)
        if (this.id === undefined) {
            // 如果 id 不存在, 说明数据文件中没有当前这条数据(新数据)
            if (models.length > 0) {
                const tail = models.slice(-1)[0]
                // log('tail', models, tail, tail.id)
                this.id = tail.id + 1
            } else {
                // models 是空数组, 说明当前这个是第一条
                this.id = 0
            }
            models.push(this)
        } else {
            // id 存在说明是旧数据
            // findIndex 是 es6 的语法
            let index = models.findIndex(k => k.id === this.id)
            if (index > -1) {
                // 如果 index > -1 说明找到了, 直接替换就可以
                models[index] = this
            }
        }
        const path = cls.dbPath()
        save(models, path)
    }

    toString() {
        const s = JSON.stringify(this, null, 2)
        return s
    }
}

class User extends Model {
    constructor(form={}) {
        // 继承的时候, 要先调用 super 方法, 才可以使用 this, 这里的 super 就是套路
        super()
        // User 类定义两个属性
        this.username = form.username || ''
        this.password = form.password || ''
        if (form.id !== undefined) {
            this.id = form.id
        } else {
            this.id = undefined
        }
        // this.id = form.id !== undefined || undefined
    }

    // 校验登录的逻辑
    validateLogin() {
        const us = User.all()
        let valid = false
        for (let i = 0; i < us.length; i++) {
            const u = us[i]
            if (u.username === this.username && u.password === this.password) {
                valid = true
                break
            }
        }
        return valid
    }

    // 校验注册的逻辑
    validateRegister() {
        return this.username.length > 2 && this.password.length > 2
    }
}

class Message extends Model {
    constructor(form={}) {
        super()
        this.author = form.author || ''
        this.content = form.content || ''
        this.extra = 'extra message'
    }
}

class Session extends Model {
    constructor(form={}) {
        super()
        this.sid = form.sid || ''
        this.username = form.username || ''
        this.expires = 0
    }
}

const test = () => {
    // const u1 = User.create({
    //     username: 'gua',
    //     password: '222',
    // })
    const u = User.findBy('password', '111')
    log('u', u)
    u.password = 'pwd'
    log('modify u', u)
    u.save()
}

test()

// 这次暴露的是一个包含两个 model 的对象
module.exports = {
    User: User,
    Message: Message,
}
