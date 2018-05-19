const fs = require('fs')
const path = require('path')

const formattedTime = () => {
    const d = new Date()

    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()

    const t = `${hour}:${minute}:${second}`
    return t
}

const log = (...args) => {
    const p = path.resolve(__dirname, 'debug-log.txt')
    const output = fs.createWriteStream(p, {
        // a 表示把内容追加到文件中
        flags: 'a'
    })
    const t = formattedTime()
    // 普通 log 函数
    console.log.call(console, t, ...args)
    // 把 log 的结果写入到文件中
    const logger = new console.Console(output)
    // process.stdout
    logger.log(t, ...args)
}

module.exports = {
    log,
}
