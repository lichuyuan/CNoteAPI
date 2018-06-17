const assert = require('assert')
const log = console.log.bind(console)

// 数据结构的核心是，一个结构只有特定的操作，可以实现特定的功能
//
// 栈的特点是「先进后出」，一般有这几个操作
// push 将一个元素存入栈中
// pop  将一个元素从栈中取出，并在栈中删除它

// top  将一个元素从栈顶的位置取出

class Stack {
    constructor() {
        this.data = []
    }
    // push 添加一个元素
    push(e) {
        this.data.push(e)
    }

    // pop 删除并返回最新添加的元素
    pop() {
        const index = this.data.length - 1
        const e = this.data[index]
        this.data.splice(index, 1)
        return e
    }

    // top 仅返回最新添加的元素
    top() {
        const index = this.data.length - 1
        return this.data[index]
    }

    toString() {
        let s = ''
        const length = this.data.length
        for (let i = 0; i < length; i++) {
            const e = this.data[length - i - 1]
            s += (e + ' > ')
        }
        return s
    }
}

const test = () => {
    const s = new Stack()

    s.push(1)
    s.push(2)
    s.push(3)
    s.push(4)

    assert(s.toString() === '4 > 3 > 2 > 1 > ')

    assert(s.pop() === 4)
    assert(s.pop() === 3)
    assert(s.pop() === 2)
    assert(s.pop() === 1)
}

if (require.main === module) {
    test()
}
