// no operation
const noop = () => {}

class Router {
    constructor() {
        this.routes = {}
        this.baseUrl = ''
        this.query = {}
        this.init()
    }

    on(path, callback) {
        this.routes[path] = callback || noop
    }

    parsedQuery(query) {
        const o = {}
        const pairs = query.split('&')
        pairs.forEach(p => {
            const [k, v] = p.split('=')
            o[k] = v
        })
        return o
    }

    parsedHash(hash) {
        const o = {}
        if (hash.includes('?')) {
            const [path, query] = hash.split('?')
            o.path = path
            o.query = this.parsedQuery(query)
        } else {
            o.path = hash
            o.query = {}
        }
        return o
    }

    reload() {
        // 路由的形式为 #/home?query=1
        // 去掉 #
        const hash = location.hash.slice(1)
        const {path} = this.parsedHash(hash)
        const func = this.routes[path] || noop
        func()
    }

    init() {
        window.addEventListener('hashchange', (e) => {
            this.reload()
        })
        window.addEventListener('DOMContentLoaded', (e) => {
            this.reload()
        })
    }
}