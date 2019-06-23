const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise

mongoose.connect(config.db, { useNewUrlParser: true })

class Model extends mongoose.Model {
    // // 查询所有
    static async all() {
        return super.find()
    }
    // 根据 id 查询
    static async get(id) {
        return super.findById(id)
    }
    // 单条件查询返回单个数据
    static async findBy(key, value) {
        const query = {
            [key]: value,
        }
        return super.findOne(query)
    }

    // // 单条件查询返回单个数据
    // static async findAll(key, value) {
    //     const query = {
    //         [key]: value,
    //     }
    //     return super.find(query).exec()
    // }
    //
    // static async findByQuery(querys) {
    //     return super.find(querys)
    // }

    static async create(form, kwargs={}) {
        const m = await super.create(form)
        Object.keys(kwargs).forEach(k => m[k] = kwargs[k])
        m.save()
        return m
    }

    static async remove(id) {
        const query = {
            _id: id,
        }
        return super.deleteOne(query)
    }
}

module.exports = {
    mongoose,
    Model,
}
