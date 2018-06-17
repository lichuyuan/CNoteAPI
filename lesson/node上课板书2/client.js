// 第一次是请求 http://movie.douban.com/top250
// const get = (url, callback) => {
//     // 引入一个模块, 会在下面用到
//     const net = require('net')
//
//     // 设置连接服务器的信息
//     // 'http://movie.douban.com/top250'
//     const host = 'movie.douban.com'
//     const port = 80
//
//     // const {protocol, host, port, path} = parsedUrl(url)
//
//     // 创建一个客户端, 可以连接到服务器
//     const client = new net.Socket()
//
//     // 客户端根据给出的配置参数打开一个连接, 这样可以连接到服务器
//     client.connect(port, host, () => {
//         console.log('connect to: ', host, port)
//
//         // 向服务器发送一个消息
//         const request = 'GET /top250 HTTP/1.1\r\nHost: movie.douban.com\r\n\r\n'
//         client.write(request)
//     })
//
//     // 当接收服务器的响应数据时触发 data 事件
//     client.on('data', (d) => {
//         // 参数是 d, 默认情况下是 buffer 类型
//         // 可以用 d.toString() 将 buffer 转成字符串
//         console.log(d.toString())
//
//         // 完全关闭 client 的连接, 套路写法
//         client.destroy()
//     })
//
//     // client 关闭的时候触发这个事件
//     client.on('close', function() {
//         console.log('connection closed')
//     })
// }

// 返回 301 之后, 浏览器会发第二次请求, 值是 header 里面的 location 的值
// 第二次是请求 https://movie.douban.com/top250
const get = (url, callback) => {
    // 引入一个模块, 会在下面用到
    // const net = require('net')
    // tls 是用来发送 https 请求的模块
    // 相当于在 socket 上面套了一层
    const tls = require('tls')

    // 设置连接服务器的信息
    // 'http://movie.douban.com/top250'
    const host = 'movie.douban.com'
    const port = 443

    // const {protocol, host, port, path} = parsedUrl(url)

    // 创建一个客户端, 可以连接到服务器
    // const client = new net.Socket()
    const client = new tls.TLSSocket()

    // 客户端根据给出的配置参数打开一个连接, 这样可以连接到服务器
    client.connect(port, host, () => {
        console.log('connect to: ', host, port)

        // 向服务器发送一个消息
        const request = 'GET /top250 HTTP/1.1\r\nHost: movie.douban.com\r\n\r\n'
        client.write(request)
    })

    // 当接收服务器的响应数据时触发 data 事件
    client.on('data', (d) => {
        // 参数是 d, 默认情况下是 buffer 类型
        // 可以用 d.toString() 将 buffer 转成字符串
        console.log(d.toString())

        // 完全关闭 client 的连接, 套路写法
        client.destroy()
    })

    // client 关闭的时候触发这个事件
    client.on('close', function() {
        console.log('connection closed')
    })
}

const __main = () => {
    const url = 'http://movie.douban.com/top250'
    get(url, (r) => {
        console.log(r)
    })
}

__main()