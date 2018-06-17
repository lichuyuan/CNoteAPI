const redis = require('redis')

// 创建一个默认连接
// port 为 6379
// host 为 127.0.0.1
const client = redis.createClient()
// const client = redis.createClient({
//     host: '127.0.0.1',
//     port: 6379,
// })

const log = console.log.bind(console)

// redis 默认选择第 0 个数据库, 如果想选择第 3 个则用下面的形式
// client.select(3, () => {})

// 套路处理错误
client.on('error', (error) => {
    log('error message', error)
})

// redis 相当于一个大字典
// 所以下面函数的第一个参数通常都是这个大字典的 key

// 设置 string key 这个字符串的 value 为 string value
// redis.print 是一个用来输出 redis 执行结果的函数
// 相当于 redis 的 log 函数
client.set('string key', 'string value', redis.print)

// 获取 string key 的值
client.get('string key', (error, value) => {
    log('value ', value)
})

// 删除 string key 这一条记录
client.del('string key', () => {
    client.get('string key', (error, value) => {
        log('after delete, value is', value)
    })
})

// hset 对应的就是 hash set, 也就是 第一个参数 hash key 是字典的 key
// 第二个和第三个参数组成一个 key-value 对(也就是字典)
client.hset('hash key', 'hashset 1', 'some value', redis.print)

// 也可以写成下面的形式, key 还是 hash key
// 字典是 hashset 2 和 other value 组成的
client.hset(['hash key', 'hashset 2', 'other value'], redis.print)

// 获取 hash key 里面的 hashset 2 对应的 value
client.hget('hash key', 'hashset 2', (error, data) => {
    log('data get', data)
})

// 获取 hash key 对应的 value 里面包含的所有 keys
client.hkeys('hash key', (error, keys) => {
    log('keys length', keys.length)
    keys.forEach((e, i) => {
        log(`${i}: ${e}`)
    })
    client.quit()
})

// 获取 hash key 对应的 value(是一个字典)
client.hgetall('hash key', (error, entries) => {
    log('entries', entries)
})
