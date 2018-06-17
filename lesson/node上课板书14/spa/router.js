const log = console.log.bind(console)

const es = selector => document.querySelectorAll(selector)

const parsedUrl = (url) => {
    const hash = url.split('#')[1]
    return hash
}

const __main = () => {
    log('hello')
    var links = es('a')
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.addEventListener('click', (e) => {
            var url = location.href
            var hash = parsedUrl(url)
            log('hash', hash)
        })

    }
}

__main()