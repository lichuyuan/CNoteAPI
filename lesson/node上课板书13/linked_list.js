const log = console.log.bind(console)

class Node {
    constructor(e=null) {
        this.element = e
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = new Node()
        this._length = 0
    }

    isEmpty() {
        return this._length === 0
    }

    length() {
        return this._length
    }
    
    _nodeAtIndex(index) {
        let n = this.head
        let i = 0
        while (i < index) {
            n = n.next
            i++
        }
        return n
    }

    elementAtIndex(index) {
        const node = this._nodeAtIndex(index)
        return node.element
    }

    // 在链表末尾增加一个元素
    append(e) {
        let n = this.head
        while (n.next !== null) {
            n = n.next
        }
        const node = new Node(e)
        n.next = node
        this._length++
    }

    // 返回一个元素的 index
    indexOf(e) {
        let i = 0
        let n = this.head
        while (n.next !== null) {
            if (e === n.element) {
                return i
            }
            n = n.next
            i++
        }
        return -1
    }

    toString() {
        let n = this.head
        let s = ''
        while (n !== null) {
            s += (n.element + ' > ')
            n = n.next
        }
        return s
    }

    log() {
        let n = this.head.next
        log('遍历链表')
        while(n != null) {
            log(' > ', n.element)
            n = n.next
        }
    }
}

const testAppend = () => {
    const n1 = new Node(111)
    const n2 = new Node(222)

    const l = new LinkedList()
    l.head = new Node('head')
    l.head.next = n1
    n1.next = n2

    l.append(333)

    log(l.toString())
}

const test = () => {
    testAppend()
}

if (require.main === module) {
    test()
}
