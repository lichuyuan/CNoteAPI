const assert = require('assert')

const log = console.log.bind(console)

// 队列结构
// 队列的特点是「先进先出」，一般有这几个操作
// enqueue 将一个元素存入队列中
// dequeue 将一个元素从队列中取出，并在队列中删除它
// 可以把队列看做排队，银行叫号机就是队列，先取号的先入队，叫号的时候也就先出队
//
class Queue {
    constructor() {
        // data 是存储元素的数组
        this.data = []
    }
    // 入队
    enqueue(element) {
        this.data.push(element)
    }

    // 出队
    dequeue() {
        const e = this.data[0]
        this.data.splice(0, 1)
        return e
    }

    // 队列长度
    length() {
        return this.data.length
    }

    // 清空队列
    empty() {
        this.data = []
    }

    toString() {
        let s = ''
        for (let i = 0; i < this.data.length; i++) {
            const e = this.data[i]
            s += (e + ' > ')
        }
        return s
    }
}


const test = () => {
    const q = new Queue()

    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    q.enqueue(4)

    assert(q.toString() === '1 > 2 > 3 > 4 > ')

    assert(q.dequeue() === 1)
    assert(q.dequeue() === 2)
    assert(q.dequeue() === 3)
    assert(q.dequeue() === 4)
}

if (require.main === module) {
    test()
}
