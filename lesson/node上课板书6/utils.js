const fs = require('fs')
const { Console } = require('console')
const path = require('path')
const nunjucks = require('nunjucks')

// 把 unix time 转成方便看懂的格式
const formattedTime = () => {
    const d = new Date()

    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()

    const t = `${hour}:${minute}:${second}`
    return t
}

const log = (...args) => {
    const path = './gua.log.txt'

    const output = fs.createWriteStream(path, {
        // a 表示把内容添加到文件中(以追加的形式, 而不是覆盖)
        flags: 'a'
    })
    const t = formattedTime()
    // 普通 log 函数
    console.log.call(console, t, ...args)
    // 把 log 的结果写入到文件中
    const logger = new Console(output)
    // process.stdout
    logger.log(t, ...args)
}

// const configuredEnvironment = () => {
//     // 得到用于加载模板的目录
//     const p = path.join(__dirname, 'templates')
//     // nunjucks 会从这个目录中读取模板, 调用 render 方法加载模板并且返回
//     const env = nunjucks.configure(p)
//     return env
// }

const configuredEnvironment = (() => {
    let env = null
    const f = () => {
        if (env === null) {
            // 得到用于加载模板的目录
            const p = path.join(__dirname, 'templates')
            // nunjucks 会从这个目录中读取模板, 调用 render 方法加载模板并且返回
            env = nunjucks.configure(p)
            return env
        } else {
            return env
        }
    }
    return f
})()

const template = (path, data) => {
    const env = configuredEnvironment()
    const r = env.render(path, data)
    return r
}

module.exports = {
    log: log,
    template: template,
}