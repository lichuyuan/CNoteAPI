const log = require('./utils')

class Request {
    constructor(raw) {
        // 函数命名原则
        // https://zhuanlan.zhihu.com/p/28038251
        // 名词就是返回数据
        // 动词就是执行动作
        const {method, path, query, headers, body} = this.parsedRaw(raw)
        this.raw = raw
        this.method = method
        this.path = path
        this.query = query
        this.body = body
        this.headers = {}
        this.cookies = {}

        this.addHeaders(headers)
    }

    // 将请求 headers 中的 cookies 解析成 object 对象,
    // 并且保存到 request.cookies 中
    addCookies() {
        const cookies = this.headers.Cookie || ''
        const pairs = cookies.split('; ')
        pairs.forEach((pair) => {
            if (pair.includes('=')) {
                const [k, v] = pair.split('=')
                this.cookies[k] = v
            }
        })
    }

    // 将请求中的 headers 解析成 object 对象,
    // 并且保存到 request.headers 中
    addHeaders(headers) {
        headers.forEach((header) => {
            const [k, v] = header.split(': ')
            this.headers[k] = v
        })
        // 直接调用 addCookies 处理 cookies
        this.addCookies()
    }

    //
    form() {
        const body = decodeURIComponent(this.body)
        const pairs = body.split('&')
        const d = {}
        for (let pair of pairs) {
            const [k, v] = pair.split('=')
            d[k] = v
        }
        return d
    }

    // 解析 path 的函数
    // 返回包含 path 和 query 的 object
    parsedPath(path) {
        // 先判断 path 中是否包含 ?
        const index = path.indexOf('?')
        // 如果不包含 ?, query 是一个空对象
        if (index === -1) {
            return {
                path: path,
                query: {},
            }
        } else {
            // 如果包含 ?, 则按照 ? 将请求中的 path 分成 path 和 query
            const l = path.split('?')
            path = l[0]

            // 下面这部分的作用是解析 query
            // query 的格式为 a=b&c=d&e=f
            const search = l[1]
            const args = search.split('&')
            const query = {}
            for (let arg of args) {
                const [k, v] = arg.split('=')
                query[k] = v
            }
            return {
                path: path,
                query: query,
            }
        }
    }

    parsedRaw(raw) {
        const r = raw
        const line = r.split(' ')
        const [method, url] = line
        const { path, query } = this.parsedPath(url)
        const message = r.split('\r\n\r\n')
        const headers = message[0].split('\r\n').slice(1)
        const body = message[1]

        return {
            method: method,
            path: path,
            query: query,
            headers: headers,
            body: body,
        }
    }
}

module.exports = Request
