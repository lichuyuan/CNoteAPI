// 使用 Request 来保存请求相关的信息
// 尽管 js 的 object 很方便, 但是有时候除了保存数据, 还会保存操作数据的函数
// 这种时候就会用类(ES5 是 function, ES6 可以很方便地用 类)来保存

// GET /login HTTP/1.1
// Host: 127.0.0.1:5000
// Connection: keep-alive
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36
// Upgrade-Insecure-Requests: 1
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
// Accept-Encoding: gzip, deflate, br
// Accept-Language: zh-CN,zh;q=0.9,und;q=0.8,en;q=0.7


// 使用 es6 的 class, 继承的时候会比 es5 的更加方便
class Request {
    // 构造器函数, 套路写法, 这个函数里声明了我们需要保存哪些属性
    // 一般来说, 请求的原始信息, 请求方法, 请求路径, query 参数 和 body 参数都是重要的数据
    // 所以我们这里直接保存了这几个信息
    constructor() {
        this.raw = ''
        // 默认是 GET 方法
        this.method = 'GET'
        this.path = ''
        // query 默认是一个 object, 这样使用会更加方便
        this.query = {}
        this.body = ''
    }

    // 一般使用 post 方法提交的数据会放在 request body 中
    // 封装一个 form 方法, 直接获取解析之后的数据(以 object 的形式)
    form() {
        // 浏览器在发送 form 表单的数据时, 会自动使用 encodeURIComponent 编码
        // 所以拿到 body 的数据之后先解码
        // 得到的是下面这种格式的数据: username=gua&password=123
        // {
        //     username: 'gua',
        //     password: '123',
        // }
        const body = decodeURIComponent(this.body)
        const pairs = body.split('&')
        const d = {}
        for (let pair of pairs) {
            const [k, v] = pair.split('=')
            d[k] = v
        }
        return d
    }
}

// const r = new Request()


// Request 是一个 class, 也可以直接暴露
module.exports = Request
