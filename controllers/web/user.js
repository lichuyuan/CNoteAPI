const config = require('../../config/index')

const avatar = (req, res) => {
    const path = require('path')
    // 头像所在的路径
    const filename = req.params.filename
    const p = config.uploadPath + filename
    // 使用 path.resolve 把头像的路径转换成绝对路径
    const absolutePath = path.resolve(p)
    res.sendFile(absolutePath)
}

module.exports = {
    avatar,
}