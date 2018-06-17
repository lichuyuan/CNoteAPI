const log = console.log.bind(console)

const ajax = (request) => {
    const p = new Promise((resolve, reject) => {
        const r = new XMLHttpRequest()
        r.open(request.method, request.url, true)
        if (request.contentType !== undefined) {
            r.setRequestHeader('Content-Type', request.contentType)
        }
        r.onreadystatechange = () => {
            if (r.readyState === 4) {
                if (r.status >= 200 && r.status < 300) {
                    // request.callback(r.response)
                    const response = JSON.parse(r.response)
                    resolve(response)
                } else {
                    reject(r.response)
                }

            }
        }
        if (request.method === 'GET') {
            r.send()
        } else {
            r.send(request.data)
        }
    })
    return p
}