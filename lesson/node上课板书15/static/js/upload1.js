const ajax = (method, path, data, callback) => {
    let r = new XMLHttpRequest()
    // 端口不一样 就可以演示跨域了
    const host = 'http://127.0.0.1:5000'
    path = host + path
    console.log(path)
    r.open(method, path, true)
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            callback(r)
        }
    }
    // data = JSON.stringify(data)
    r.send(data)
}

const e = sel => document.querySelector(sel)

const upload = function(formData) {
    let request = {
        url: '/user/upload/avatar',
        method: 'POST',
        data: formData,
    }

    ajax(request.method, request.url, request.data,  () => {
        console.log('posted')
    })
}

const postImg = () => {
    const btn = e('.upload')
    const file = e('#upload-file')
    btn.addEventListener('click', () => {
        console.log('click')
        const form = new FormData(file)
        form.append("avatar", file.files[0])
        console.log('form', form.get('avatar'))
        upload(form)
    })
}

const __main = () => {
    postImg()
}

__main()