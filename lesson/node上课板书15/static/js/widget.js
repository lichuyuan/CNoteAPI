// 组件类
// js 的 prototype 继承通常来讲是平面的结构
// 我们使用 class 的形式, 构建一棵组件树
// 这样就从扁平化继承变成立体化继承,
// 我们的组件树就会枝繁叶茂

// 我们使用的是自定义事件机制
// 也就是说用 on 监听过后, 使用 fire 可以触发
// 这个其实就是观察者模式
// 也叫做 pub/sub
// 即发布/订阅模型

// document.addEventListener('click', (e) => {
//
// })
//
// 浏览器处理了 fire('click')
class Widget {
    constructor() {
        // 使用 this.actions 作为一个容器, 存放相应的事件处理函数
        this.actions = {}
    }

    // on 是绑定事件
    on(type, action) {
        // off 函数里是将 this.actions[type] 设置为 null
        // 所以这里需要判断 this.actions[type] 是 undefined 或者 null 这两种情况
        if (typeof this.actions[type] === 'undefined' || this.actions[type] === null) {
            this.actions[type] = []
        }
        this.actions[type].push(action)
        // return this 之后，就可以继续调用类的其他方法，这个就是所谓链式调用法
        // $(element).hide().addClass('foo').siblings().removeClass('foo')
        return this
    }

    // fire 是触发事件
    fire(...args) {
        // 第一个 type 是 event type, 也就是触发的事件类型
        // 剩下的所有参数都放在 rest 中
        const [type, ...rest] = args
        const actions = this.actions[type]
        // 如果 actions 是数组, 就调用
        if (Array.isArray(actions)) {
            actions.forEach((f) => {
                f.apply(this, rest)
            })
        }
        return this
    }

    // off 是解绑事件
    off(type) {
        // 如果传入了 type, 就移除 type 对应的 actions
        // 否则移除所有的 actions
        if (type !== undefined) {
            this.actions[type] = null
        } else {
            this.actions = null
        }
        return this
    }

    // 引入了事件销毁的概念, 也就是说我们的事件是有生命周期的
    destroy() {
        if (Object.keys(this.actions).length > 0) {
            this.fire('destroyed')
        }
        this.actions = null
    }

    // single 就是创建一个单例
    static single() {
        const cls = this
        if (cls.instance === undefined) {
            cls.instance = new cls()
        }
        return cls.instance
    }
}

const test = () => {
    const w = new Widget()
    const eventType = 'message'

    w.on(eventType, () => {
        log('message event')
    })

    w.on(eventType, () => {
        log('message event 1')
    })

    w.fire(eventType)

    w.off(eventType)

    w.fire(eventType)

    w.on(eventType, () => {
        log('message event 2')
    })

    w.fire(eventType)
}

// main 用 const 定义了一次, 这里不能用, 直接调用 test
test()