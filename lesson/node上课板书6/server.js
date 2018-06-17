const net = require('net')

// 引入封装之后的 request
const Request = require('./request')
const {routeMapper, error} = require('./routes')
const routeTodo = require('./routes_todo')
const routeUser = require('./routes_user')
const {log} = require('./utils')

const responseForRequest = (request) => {
    const route = {}
    Object.assign(route, routeMapper())
    Object.assign(route, routeTodo())
    Object.assign(route, routeUser())
    const response = route[request.path] || error
    const r = response(request)
    return r
}

const processRequest = (socket, data) => {
    const s = socket
    const r = data.toString()
    // log(`request log:\n${r}`)
    const request = new Request(r)
    const response = responseForRequest(request)
    s.write(response)
    s.destroy()
}

const run = (host='', port=3000) => {
    // 创建一个服务器, 这个是套路写法
    const server = new net.Server()

    // 开启一个服务器监听连接
    server.listen(port, host, () => {
        const address = server.address()
        log(`listening server at http://${address.address}:${address.port}`)
    })

    // 当有新连接建立时, 就会触发 connection 事件
    server.on('connection', (s) => {
        // 当 socket(也就是这次的参数 s) 接收到数据的时候, 会触发 data 事件
        s.on('data', (data) => {
            const ip = s.localAddress
            log(`ip, ${ip}`)
            processRequest(s, data)
        })
    })

    server.on('error', (error) => {
        log('server error', error)
    })

    server.on('close', () => {
        log('server closed')
    })
}

// 程序的入口
const __main = () => {
    run('127.0.0.1', 5000)
}

// 如果是使用 node app.js 的方式运行, 那么 require.main 就是 module
// 否则不是(比如 const a = require('./server.js')
// 实际上这里就是一个套路
if (require.main === module) {
    // 调用 main 函数
    __main()
}
