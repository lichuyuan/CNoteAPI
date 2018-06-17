// 引入一个模块, 会在下面用到
// 模块就是别人已经写好的程序, 我们可以直接拿来使用
const net = require('net')

// 配置服务器的参数
// 服务器的 host 为空字符串, 表示接受任意 ip 地址的连接
// port 是端口, 这里设置的是 2000
// 随便选一个 1024 - 65535 之间的数字就可以, 1024 以下的端口需要管理员权限才能使用
const host = ''
const port = 2000


// 创建一个服务器, 这个是套路写法
const server = new net.Server()

// 开启一个服务器监听连接
// element.click()
server.listen(port, host, () => {
    // server.address() 返回的是绑定的服务器的 ip 地址、ip 协议、端口号
    // 这里打印出来的 ipv6 的格式, 端口是 2000
    console.log('listening.', server.address())
})

// 当有新连接建立时, 就会触发 connection 事件
// 可以想象网页里一个元素点击的时候, 就会触发 click 事件
// element.on('click', () => {
//
// })
server.on('connection', (socket) => {
    // socket 是回调函数的参数, 在这里是一个套路
    // js 中这样的情形比较多, 比如点击事件的回调函数中, 第一个参数就是 event 对象
    // element.on('click', (event) => {
    //
    // })

    // socket 有一些属性表示连接的客户端的信息
    // 下面的属性分别表示远程 ip 地址, 端口, 协议族
    const {remoteAddress, remotePort, remoteFamily} = socket
    console.log('connected client info', remoteAddress, remotePort, remoteFamily)

    // 当 socket 接收到数据的时候, 会触发 data 事件
    socket.on('data', (data) => {
        // 第一个 data 是事件名称, 是一个字符串, 规定就是这个名字
        // 第二个 data 是参数
        // data 是一个 Buffer 类型
        // Buffer 是 node 中的特殊类型, 用来处理二进制数据
        // buffer 类型调用 toString() 可以将二进制数据转成字符串
        const r = data.toString()
        console.log('接受到的原始数据', r, typeof r)

        // response 是返回的数据
        // const response = 'hello world!'
        const response = 'HTTP/1.1 200 OK\r\nContent-Length: 12\r\n\r\nhello world!'
        // write 方法用来发送数据
        // 参数可以是 string 类型, 也可以是 buffer 类型
        socket.write(response)

        // 这里是一个套路, 如果不这么做, 浏览器不知道当前请求是否已经结束
        // 会出现一直等待的情况, 也就是会一直 loading
        // socket.destroy()
    })
})

// 服务器出错的时候会触发这个事件, 但是具体什么出错是未知的, 套路写法
server.on('error', (error) => {
    console.log('server error', error)
})

// 当服务器关闭时被触发
server.on('close', () => {
    console.log('server closed')
})
