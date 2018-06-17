// 需要安装 mongodb 模块
// yarn add mongodb
const { MongoClient } = require('mongodb')

const log = console.log.bind(console)

// mongodb 默认实现了返回 promise, 所以我们可以直接使用 async 和 await 这样的语法

// 返回一个 a b 之间的随机整数
const randint = (a, b) => {
    const r = Math.random()
    const n = r * (b - a) + a
    const i = Math.floor(n)
    return i
}

const configuredDb = async(url, dbname) => {
    const uri = url + dbname
    const db = await MongoClient.connect(uri)
    log('Connected successfully to server')
    return db
}

const insert = async(db) => {
    // 这里使用的是 test_todo 这个 document
    const collection = db.collection('test_todo')
    const d = [
        {
            content: '吃饭',
            user_id: 1,
            username: 'gua',
        },
        {
            content: '喝水',
            user_id: 2,
            username: 'gua1',
        },
        {
            content: '睡觉',
            done: true,
            username: 'gua2',
        },
    ]

    // 放一个随机值来方便区分不同的数据以便下面的代码使用条件查询
    d.forEach((e) => {
        e.random = randint(1, 20)
    })

    log('todos', d)

    // insertMany 是一次插入多条记录
    const result = await collection.insertMany(d)
    log('insert result', result)
}

const find = async(db) => {
    const collection = db.collection('test_todo')
    // 查找 随机值 为 12 的所有数据
    const query1 = {
        random: 12,
    }
    const result = await collection.find(query1).toArray()
    log('随机值为 12 的所有数据', result)
}

const update = async(db) => {
    const collection = db.collection('test_todo')

    const query = {
        content: '喝水',
    }

    const form = {
        $set: {
            random: 60,
        }
    }

    // update 方法已经废弃, 使用 updateOne 和 updateMany 方法更新数据
    // updateOne 更新查询出来的第一条数据
    // const r1 = await collection.find(query).toArray()
    // log('before update r1', r1)
    // await collection.updateOne(query, form)
    // const r2 = await collection.find(query).toArray()
    // log('after update r2', r2)

    // updateMany 更新查询出来的所有数据
    const query1 = {
        content: '吃饭',
    }

    // 更新的时候不仅可以改变现有字段的值
    // 也可以直接添加一个字段并且赋值
    const form1 = {
        $set: {
            updated_time: Date.now()
        }
    }

    await collection.updateMany(query1, form1)
    const r3 = await collection.find(query1).toArray()
    log('after update many r3', r3)
}

const remove = async(db) => {
    const collection = db.collection('test_todo')

    const query = {
        random: 15,
    }

    const r1 = await collection.find(query).toArray()
    log('before delete', r1)
    await collection.deleteOne(query)
    const r2 = await collection.find(query).toArray()
    log('after delete', r2)
}

const testMongo = async () => {
    const url = 'mongodb://localhost:27017/'
    const dbname = 'node'
    const database = await configuredDb(url, dbname)
    const db = database.db(dbname)
    // log('db', db)
    // const result = insert(db)
    // log('result', result)

    remove(db)

    // update(db)

    // find(db)
}

const test = () => {
    // connect()
    testMongo()
}

if (require.main === module) {
    test()
}
