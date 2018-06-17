const assert = require('assert')
const log = console.log.bind(console)

class HashTable {
    constructor() {
        // data 是用来存储数据的数组
        // 先让它有 101 个格子好了
        // 这个尺寸最好选素数
        // 这样可以得到更为合理的下标分布
        this.size = 101
        this.data = []
    }

    hash(s) {
        let sum = 0
        let n = 1
        for (let i = 0; i < s.length; i++) {
            const c = s[i]
            sum += (c.charCodeAt(0) * n)
            // 每次循环 n 都是 *10
            // 这样 gua uag agu 算出来是不同的数字
            n *= 10
        }
        return sum
    }

    index(s) {
        const index = this.hash(s) % this.size
        return index
    }

    _insertAtIndex(index, key, value) {
        // 下划线开始的函数被我们视为私有函数
        // 但实际上还是可以在外部调用, 这只是一个给自己看的标记

        // 检查下标处是否是第一次插入数据
        const v = this.data[index]
        // data 是要添加进去的数组，其实就是 key value 整体，
        // js 没有 entry 这样的东西, 所以就用数组来保存
        const data = [key, value]
        if (v === undefined) {
            // v 是 undefined, 说明第一次找到 index
            // 那么就直接把数据放在这个位置
            // 注意 我们把 key value 作为一个整体来保存，
            // 这是因为可能会出现相同 hash 值的 key
            // 这个时候就要比较原始 key value 来找到相应的数据
            this.data[index] = [data]
        } else {
            // 如果 v 是数组, 说明不是第一次找到 index
            // 直接把 data 添加在数组后面就可以
            this.data[index].push(data)
        }
    }

    set(key, value) {
        // 先计算出下标
        const index = this.index(key)
        this._insertAtIndex(index, key, value)
    }

    get(key, value) {
        const index = this.index(key)
        const v = this.data[index]
        // Array.isArray 可以用来判断一个变量是不是数组
        if (Array.isArray(v)) {
            // v 不为 undefined, 说明 v 是一个数组，
            // 遍历检查是否包含 key
            for (let i = 0; i < v.length; i++) {
                // e 保存的是数组的形式，第一个元素是 key，第二个元素是 value
                const e = v[i]
                if (e[0] === key) {
                    return e[1]
                }
            }
        }
        // 如果 v 是 undefined 说明没有找到，返回 value
        // 如果 v 是一个数组，但是遍历之后没有找到 key，这也是没有找到，返回 value
        return value
    }
}

const test = () => {
    const name = [
        'gua',
        'xiao',
        'name',
        'web',
        'python',
    ]
    const t = new HashTable()
    name.forEach((key, index) => {
        t.set(key, index)
    })

    name.forEach((key, index) => {
        const v = t.get(key)
        assert(v === index)
    })
}

if (require.main === module) {
    test()
}
