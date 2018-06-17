// 引入模块
const fs = require('fs')
const {log} = require('../utils')

// 一个辅助函数, 确保要操作的文件已经存在
// 如果不存在就直接创建这个文件, 这样在调用的时候不会报错
const ensureExists = (path) => {
    const exists = fs.existsSync(path)
    if (!exists) {
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}

// 将数据(object 或者 array)写入到文件中, 相当于持久化保存数据
// data 是 object 或者 array
// path 是 保存文件的路径
const save = (data, path) => {
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

// 从文件中读取数据, 并且转成 JSON 形式(即 object 或者 array)
// path 是保存文件的路径
const load = (path) => {
    const options = {
        encoding: 'utf8',
    }
    ensureExists(path)
    const s = fs.readFileSync(path, options)
    const data = JSON.parse(s)
    return data
}

class Model {
    // id 是每个 model 都有的属性, 直接在 Model 类里声明
    constructor(form={}) {
        this.id = 'id' in form ? form.id : undefined
    }

    static dbPath() {
        const classname = this.name.toLowerCase()
        const path = `db/${classname}.json`
        return path
    }

    static _newFromMapper(mapper) {
        const m = new this(mapper)
        return m
    }
    static create(form={}) {
        const m = new this(form)
        m.save()
        return m
    }

    static remove(id) {
        const cls = this
        const ms = cls.all()
        const index = ms.findIndex(m => m.id === id)
        if (index > -1) {
            ms.splice(index, 1)
        }
        const path = cls.dbPath()
        save(ms, path)
    }

    static all() {
        const path = this.dbPath()
        const models = load(path)
        // 之前的写法是
        // const instance = cls.create(m)
        // 这样的话会出现递归调用的情况
        // 因为 create 里会调用 save 方法, save 方法里又会调用 all 方法
        // 即 all -> create -> save -> all
        // 为了避免这种情况, 用一个不调用 save 的新方法来生成实例
        const ms = models.map(m => this._newFromMapper(m))
        return ms
    }

    static findBy(key, value) {
        const models = this.all()
        const m = models.find(e => e[key] === value)
        const model = m || null
        return model
    }

    static findAll(key, value) {
        const all = this.all()
        let model = all.filter(k => k[key] === value)
        return model
    }

    static get(id) {
        return this.findBy('id', id)
    }

    save() {
        const cls = this.constructor
        const models = cls.all()
        if (this.id === undefined) {
            // 如果 id 不存在, 说明数据文件中没有当前这条数据(新数据)
            if (models.length > 0) {
                const tail = models.slice(-1)[0]
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

module.exports = Model
