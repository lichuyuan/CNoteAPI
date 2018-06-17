const crypto = require('crypto')

const testMd5 = function(s) {
    // 选择 md5 摘要算法
    const algorithm = 'md5'

    // 创建 hash 对象
    const hash = crypto.createHash(algorithm)

    // 更新 hash 对象
    hash.update(s)
    // log md5 摘要信息, 这里是 c9c1ebed56b2efee7844b4158905d845
    console.log('md5 摘要', hash.digest('hex'))
}

const testSha1 = function(s) {
    // 选择 sha1 摘要算法
    const algorithm = 'sha256'

    // 创建 hash 对象
    const hash = crypto.createHash(algorithm)

    // 更新 hash 对象
    hash.update(s)
    // log sha1 摘要信息, 这里是 4843c628d74aa10769eb21b832f00a778db8b17e
    console.log('sha1 摘要', hash.digest('hex'))
}

function saltedPassword(password, salt='') {
    function _md5hex(s) {
        const hash = crypto.createHash('md5')
        hash.update(s)
        const h = hash.digest('hex')
        return h
    }

    const hash1 = _md5hex(password)
    const hash2 = _md5hex(password + salt)

    console.log('hashed password', hash1, hash2)
    return hash2
}

const testSalt = function() {
    saltedPassword('12345', '')
    saltedPassword('12345', 'abc')
}

const testRaw = function() {
    function hashedPassword(password) {
        const hash = crypto.createHash('md5')
        hash.update(password)
        const pwd = hash.digest('hex')
        return pwd
    }

    // console.time 和 console.timeEnd 组合使用, 会 log 出程序运行的时间
    console.time('find password')
    const pwd = '81dc9bdb52d04dc20036dbd8313ed055'
    for (let i = 0; i < 10000; i++) {
        const s = String(i)
        const password = hashedPassword(s)
        if (password === pwd) {
            console.log('原始密码是', s)
            break
        }
    }
    console.timeEnd('find password')
}

const testEncrypt = function(s, key) {
    const algorithm = 'aes-256-cbc'
    const cipher = crypto.createCipher(algorithm, key)
    let c = cipher.update(s, 'utf8', 'hex')
    c += cipher.final('hex')
    console.log('加密后的信息', c)
    return c
}

const testDecrypt = function(c, key) {
    // aes-256-cbc 的加密和解密时间都比较短, 是表现比较不错的算法, 因此用这个演示如果加解密
    const algorithm = 'aes-256-cbc'
    const decipher = crypto.createDecipher(algorithm, key)
    // 一定要用这种累加的方式来处理
    // 这里需要注意的是调用 update 函数之后, 返回不一定是加密后的数据
    // 所以要先调用 update, 然后调用 final, 并且把这些结果累加起来
    let d = decipher.update(c, 'hex', 'utf8')
    d += decipher.final('utf8')
    console.log('原始信息', d)
}

const test = function() {
    // 要加密的是 'gua'
    const s = '1516191694665'
    // testMd5(s)
    // testSha1(s)
    // testSalt()
    //
    const key = 'dududu'
    const c = testEncrypt(s, key)
    testDecrypt(c, key)
    //
    // testRaw()

    const hashes = crypto.getHashes()
    const ciphers = crypto.getCiphers()

    // console.log('hashes and ciphers method', hashes, ciphers)
}

const __main = () => {
    test()
}

__main()
