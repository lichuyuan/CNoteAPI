const log = require('./utils')

class Request {
    constructor() {
        this.raw = ''
        this.method = 'GET'
        this.path = ''
        this.query = {}
        this.body = ''
        this.headers = {}
        this.cookies = {}
    }

    // 将请求 headers 中的 cookies 解析成 object 对象,
    // 并且保存到 request.cookies 中
    // Cookie: user=gua; path=/;
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
        // 这一步有人会使用 reduce 方法, 会讲一下
        // 知道这个方法可以保护自己, 可以看看 redux 作者的用法
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
}



module.exports = Request