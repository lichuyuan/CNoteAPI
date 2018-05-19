const User = require('../../models/user')
const auth = require('../auth')

const index = async (req, res) => {
    const userList = await User.all()
    const u = await auth.currentUser(req)
    const args = {
        users: userList,
        user: u,
    }
    res.render('index.html', args)
}

const base = (req, res) => {
    res.render('base.html')
}

module.exports = {
    index,
    base,
}