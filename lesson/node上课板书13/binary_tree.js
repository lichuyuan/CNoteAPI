class Tree {
    constructor(element=null) {
        this.element = element
        this.left = null
        this.right = null
    }

    traversal() {
        // 树的遍历, 是一个递归操作
        console.log('element is', this.element)
        if (this.left !== null) {
            this.left.traversal()
        }
        if (this.right !== null) {
            this.right.traversal()
        }
    }
}

const test = () => {
    // 手动构建二叉树
    // 为何手动这么麻烦呢, 因为一般是自动生成的
    // 这里只需要掌握性质就好
    const a = new Tree(0)
    const b = new Tree(1)
    const c = new Tree(2)
    const d = new Tree(3)
    const e = new Tree(4)
    const f = new Tree(5)
    const g = new Tree(6)

    a.left = b
    a.right = c
    b.left = d
    b.right = e
    c.left = f
    c.right = g

    a.traversal()
}

if (require.main === module) {
    test()
}

/*
            0
      1          2
    3    4    5    6
*/
