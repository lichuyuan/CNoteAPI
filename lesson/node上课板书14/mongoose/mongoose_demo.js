const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/node14'

const log = console.log.bind(console)

mongoose.connect(url)

const db = mongoose.connection

db.on('connected', () => {
    log('connection to', url)
})

db.on('error', (e) => {
    log('套路报错', e)
})

db.on('disconnected', () => {
    log('disconnected')
})


const randint = (a, b) => {
    const number = Math.random()
    const n = Math.floor(number * (b - a) + a)
    return n
}

// schema 会映射到 mongodb 里面的 collection
// schema 相当于确定了表结构
const Schema = mongoose.Schema

// 指定 username 为 string 类型
// 也可以按照 password 那种形式来指定
const userSchema = new Schema({
    username: String,
    password: {
        type: String,
    },
    note: String,
})

// schema 本身并不会操作数据库, 只是定义模型
// 通过 mongoose.model 创建一个 Model
// 第一个参数用来生成数据库的 collection 的名字,
// 注意这里生成的是复数的形式, 也就是 users
// 第二个参数是指定的 schema
const User = mongoose.model('User', userSchema)


const create = () => {

    // 有了 User model 之后就可以 new 一些实例,
    // 这个实例是 documents, 可以理解为 一行数据(Excel 中的一行)
    // 这些实例可以调用内置的 mongoose 方法
    const u1 = new User({
        username: 'gua',
        password: '123',
        note: randint(10, 20),
    })

    log('u1', u1)

    // new 出来的实例调用 save 方法就会把数据保存到 collection 中
    u1.save((error, result) => {
        log('save result', result)
    })
}

const del = (query) => {
    // 删除一条记录
    User.deleteOne(query, (error, result) => {
        log('delete one result', result)
    })

    // 删除多条记录
    // User.deleteMany(query, (error, result) => {
    //     log('delete many result', result)
    // })

    // 默认删除多条记录
    // const options = {
    //     single: true,
    // }
    // User.remove(query, (error, result) => {
    //     log('remove result', result)
    // })
}

const update = (query) => {
    const form = {
        note: 'node1',
    }

    // update 更新记录, 如果有多条, 默认只更新一条
    User.update(query, form, (error, result) => {
        log('update result', result)
    })

    const options = {
        multi: true,
    }
    // 如果要更新多条, 设置 multi 为 true
    // User.update(query, form, options, (error, result) => {
    //     log('update multi result', result)
    // })
}

const fetch = (query) => {
    // 查找所有记录
    // User.find(query, (error, result) => {
    //     log('find result', result)
    // })

    // 根据 document 的 id 来查找, 也就是 _id
    // 默认会查找所有字段
    const id = '5a745131fc409816b89597c0'
    // User.findById(id, (error, result) => {
    //     log('find by id result', result)
    // })


    const fields1 = 'username password'
    // User.findById(id, fields1, (error, result) => {
    //     log('find by id fields1 result', result)
    // })

    // - 表示不查询这个 field
    const fields2 = 'username -_id'
    // User.findById(id, fields2, (error, result) => {
    //     log('find by id fields2 result', result)
    // })

    // 查找一条记录
    User.findOne(query, (error, result) => {
        log('find one result', result)
    })
}


const __main = () => {
    const query = {
        username: 'gua',
    }

    // create()
    // del(query)
    // update(query)
    // fetch(query)
}

__main()
