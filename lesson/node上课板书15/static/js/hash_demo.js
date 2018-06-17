const loadTodos = () => {
    const todoApi = new TodoApi()
    todoApi.all().then((r) => {
        log('response', r)
    })
}

const __main = () => {
    const router = new Router()
    router.on('/todo', () => {
        loadTodos()
    })
    router.on('/home', () => {
        log('home')
    })
}

__main()