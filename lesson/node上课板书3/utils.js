// 封装 console.log
const log = console.log.bind(console)

// 把封装之后的 log 函数暴露出去, 这样在其他地方就可以直接使用了
module.exports = log

// 默认情况下, module.exports 和 exports 指向同一个对象
// 相当于
// module.exports = {}
// exports = module.exports

// exports.log = log
// exports = {
//     log: log,
// }