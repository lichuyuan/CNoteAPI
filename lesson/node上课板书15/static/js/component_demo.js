const initMovie = (data) => {
    const options = {
        wrapper: $('.wrapper'),
        data: data,
        store: Store,
        components: Tooltip,
    }
    new Movie(options)
}

const __main = () => {
    $(document).ready(() => {
        const m = new MovieApi()
        m.all().then(r => {
            initMovie(r.data)
        })
    })
}

__main()