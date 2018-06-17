var ajax = (method, path, data, callback) => {
    var r = new XMLHttpRequest()
    // 端口不一样 就可以演示跨域了
    var host = 'http://localhost:3300'
    path = host + path
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            callback(r.response)
        }
    }
    r.send(data)
}

// $.ajax({
//     url: /api/topic/all,
//     method: method,
//     data: data,
//     success: function(r) {
//         if (r.success) {
//             successResponse(r.data)
//         } else {
//             errorResponse(r.message)
//         }
//     },
//     error: function(e) {
//         // 406 用户名已经存在
//         var r = {
//             success: false,
//             data: null,
//             message: '网络很差'
//         }
//         globalErrorResponse(r)
//     }
// })

var fetch = (url, callback) => {
    ajax('GET', url, '', function(r) {
        console.log('debug raw response', r, r.length)
        // var data = JSON.parse(r)
        // callback(data)
    })
}

var create = (url, form, callback) => {
    var data = JSON.stringify(form)
    ajax('POST', url, data, function(r) {
        console.log('debug add response', r, r.length)
        var data = JSON.parse(r)
        callback(data)
    })
}

var testFetch = () => {
    var url = '/api/topic/all'
    var response = (r) => {
        console.log('debug r', r)
    }
    fetch(url, response)
}

var testCreate = () => {
    var url = '/api/topic/add'
    var response = (r) => {
        console.log('create response', r)
    }
    var form = {
        title: 'nodeclub',
        content: 'node11',
    }
    create(url, form, response)
}

var __main = () => {
    testFetch()
    // testCreate()
}

__main()