class Foo {
    constructor() {
        this.key = 'test'
    }
}

// js 实现单例的一种方式
const single = (() => {
   let i = null
   const f = () => {
       if (i === null) {
           i = new Foo()
           return i
       } else {
           return i
       }
   }
   return f
})()

// const o1 = new Foo()
// const o2 = new Foo()

const o1 = single()
const o2 = single()

console.log(o1 === o2)