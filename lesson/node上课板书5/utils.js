const formattedTime = () => {
    const d = new Date()

    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()

    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()

    const t = `${year}/${month}/${date} ${hour}:${minute}:${second}`
    return t
}

// bind 的第二个参数被承包了
const log = console.log.bind(console)
// const log = (args) => {
//     const time = formattedTime()
//     console.log.call(console, time, args)
// }

module.exports = log
