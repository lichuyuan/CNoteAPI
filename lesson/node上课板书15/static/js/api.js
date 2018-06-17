class Api {
    get(path) {
        const url = this.baseUrl + path
        return ajax({
            method: 'GET',
            url: url,
        })
    }
    post(path, data) {
        const url = this.baseUrl + path
        data = JSON.stringify(data)
        return ajax({
            method: 'POST',
            url: url,
            data: data,
        })
    }
}

class TodoApi extends Api {
    constructor() {
        super()
        this.baseUrl = '/api/todo'
    }
    all() {
        const path = '/all'
        return this.get(path)
    }
}

class MovieApi extends Api {
    constructor() {
        super()
        this.baseUrl = '/api/movie'
    }
    all() {
        const path = '/all'
        return this.get(path)
    }
}