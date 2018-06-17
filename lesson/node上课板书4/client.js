// 引入一个模块, 会在下面用到
const net = require('net')

// 设置连接服务器的信息
const host = '127.0.0.1'
const port = 5000

// 创建一个客户端, 可以连接到服务器
const client = new net.Socket()

// 客户端根据给出的配置参数打开一个连接, 这样可以连接到服务器
client.connect(port, host, () => {
    console.log('connect to: ', host, port)

    // 向服务器发送一个消息
    const request = 'GET / HTTP/1.1\r\nCookie: user=fgowimddwfd8nfwi\r\nHost: 127.0.0.1\r\n\r\n'
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
