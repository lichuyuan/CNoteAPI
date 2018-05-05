const formattedTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleString()
}

const formattedLevel = (level) => {
    const levels = {
        0: '重要-紧急',
        1: '重要-不紧急',
        2: '不重要-紧急',
        3: '不重要-不紧急',
    }
    return levels[level]
}

module.exports = {
    formattedTime: formattedTime,
    formattedLevel: formattedLevel,
}
