const fs = require('fs')
const path = require('path')
const {log} = require('../utils')

const ensureExists = (path) => {
    const exists = fs.existsSync(path)
    if (!exists) {
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}

const save = (data, path) => {
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

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
    constructor(form={}) {
        this.id = form.id || undefined
        const now = Date.now()
        this.created_time = form.created_time || now
        this.updated_time = form.updated_time || now
    }

    static dbPath() {
        const classname = this.name.toLowerCase()
        const file = `db/${classname}.json`
        // models 和 db 是同级目录, 所以先用 .. 返回到上一级目录
        const p = path.join(__dirname, '..', file)
        return p
    }

    static _newFromMapper(dict) {
        const m = new this(dict)
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
            if (models.length > 0) {
                const tail = models[models.length - 1]
                this.id = tail.id + 1
            } else {
                // 0 在 js 中会被处理成 false, 第一个元素的 id 设置为 1, 方便处理
                this.id = 1
            }
            models.push(this)
        } else {
            const index = models.findIndex(k => k.id === this.id)
            if (index > -1) {
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