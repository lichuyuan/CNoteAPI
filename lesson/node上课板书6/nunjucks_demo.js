const path = require('path')
const nunjucks = require('nunjucks')

// __dirname 是当前文件所在的目录
// path.join 把所有 path 拼接在一起
// 得到用于加载模板的目录
// C:\workspace\node2\node上课用品6
// /workspace/node2/nodeuhkeyspn6

const p = path.join(__dirname, 'templates')
// nunjucks 会从这个目录中读取模板, 调用 render 方法加载模板并且返回
const env = nunjucks.configure(p)

const ns = [1, 2, 3]
const us = [
    {
        id: 1,
        name: 'gua',
    },
    {
        id: 2,
        name: '瓜',
    },
]

const data = {
    name: 'gua',
    numbers: ns,
    users: us,
}

// 用 render 方法渲染模板
// 可以传递参数
const r = env.render('demo.html', data)
// console.log(r)
console.log('__dirname', __dirname)
console.log('__filename', __filename)