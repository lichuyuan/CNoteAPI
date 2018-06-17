// 引入 nodejs 的 sqlite3 模块,
// nodejs 有不少 sqlite3 模块
// 我们用的是 better-sqlite3 模块, 按照作者的说法, 全方位优于其他模块
// 比如同步 API、 完整事务支持等
const Database = require('better-sqlite3')

// 自定义 log 函数, 方便使用
const log = console.log.bind(console)

// 创建表的函数
const create = (db) => {
    // 创建表的 sql 语句
    const sqlCreate = `
    CREATE TABLE users (
        id	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        username	TEXT NOT NULL UNIQUE,
        password	TEXT NOT NULL,
        email	    TEXT
    )
    `
    // db.prepare 会根据传的 sql 语句创建一个 Statement 对象,
    // 这个对象可以用来执行 sql 语句
    const statement = db.prepare(sqlCreate)
    // 执行 sqlCreate 语句
    const info = statement.run()
    log('创建成功', info)
}

// 往表里面增加数据的函数
const insert = (db, username, password, email) => {
    // 插入数据的 sql 语句
    // const sql = 'insert into users(username, password, email) values (?, ?, ?)'a
    const sqlInsert = `
    INSERT INTO
        users(username, password, email)
    VALUES
        (?, ?, ?)
    `
    // 创建 Statement 对象
    const statement = db.prepare(sqlInsert)
    const args = [username, password, email]
    // insert 语句需要参数, 将参数放在 array 中, 然后调用 run 的时候传过去
    // statement.run 的返回值 info 是一个对象
    // info.changes 表示这次操作（插入数据、更新数据、删除数据）一共改变了多少行
    const info = statement.run(args)

    // run 除了接收 array 作为参数, 也可以直接拆开一个一个传
    // statement.run(username, password, email)
    log('插入数据成功', info)
}

// 查询数据的函数
const select = (db) => {
    // sql 注入, 非常严重的安全漏洞

    // 查询数据库的 sql 语句
    const sqlQuery = `
    SELECT
        *
    FROM
        users
    `
    // 创建 Statement 对象
    const statement = db.prepare(sqlQuery)
    // get 方法返回一条数据
    // 如果查找出来的有多条, 只返回第一条
    const row = statement.get()

    // all 方法返回多条数据
    const rows = statement.all()
    log(row, rows)
}

// SQL Injection
const selectBad = (db) => {
    const username = "'gua'"
    // const password = "'' OR '1'='1'; DROP TABLE users"
    const password = "'' OR '1'='1'"
    const sql = `
    SELECT
      *
    FROM
      users
    WHERE
      username=? AND password = ?
    `
    log('sql', sql)
    // SELECT * FROM users WHERE username = '' OR '1'='1';
    const statement = db.prepare(sql)
    const r = statement.all(username, password)
    log('r', r)
}

// 删除数据的函数
const del = (db, userId) => {
    // 删除数据的 sql 语句
    const sqlDelete = `
    DELETE FROM
        users
    WHERE
        id=?
    `
    const statement = db.prepare(sqlDelete)
    // 传入 userId
    statement.run(userId)
    log('删除成功')
}

// 更新数据的函数
const update = (db, userId, email) => {
    // 更新数据的 sql 语句
    const sqlUpdate = `
    UPDATE
        users
    SET
        password=?
    WHERE
        id=?
    `
    const statement = db.prepare(sqlUpdate)
    // 传入 email 和 userId 两个参数
    statement.run(email, userId)
    log('更新成功')
}

const testCreate = (db) => {
    create(db)
}

const testInsert = (db) => {
    insert(db, 'gua1', '12345', '12345@qq.com')
}

const testSelect = (db) => {
    select(db)
}

const testDelete = (db) => {
    del(db, 1)
}

const testUpdate = (db) => {
    update(db, 1, 'gua@gualab.cc')
}

const test = () => {
    // 创建一个数据库连接, 如果 node8.db 这个数据库文件不存在会先创建,
    // 然后创建连接
    // 如果数据库文件存在则直接创建连接
    const dbPath = 'node8.db'
    const db = new Database(dbPath)

    // db 这个连接有一些属性
    // db.open 表示数据库是否打开
    // db.name 表示当前连接的数据库的名称
    log(db.open, db.name)

    // 打开数据库后, 就可以用 create 函数创建表
    // testCreate(db)

    // 然后用 insert 函数插入数据
    // testInsert(db)

    // 可以用 del 函数删除数据
    // testDelete(db)

    // 可以用 update 函数更新数据
    // testUpdate(db)

    // select 函数查询数据
    // testSelect(db)

    // sql 注入
    selectBad(db)


    // 关闭数据库, 用完数据库之后需要关闭
    db.close()
}

if (require.main === module) {
    test()
}

// weibo 引入 comment


// comment 又需要用到 weibo
// 在函数里面引入可以避免循环依赖的问题

class Comment {
    weibo_user() {
        const Weibo = require('weibo_path')
    }
}