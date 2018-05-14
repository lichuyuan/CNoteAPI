const formattedTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleString()
}

const formattedLevel = (level) => {
    const levels = {
        0: 'danger',
        1: 'warning',
        2: 'info',
        3: 'success',
    }
    return levels[level]
}

module.exports = {
    formattedTime: formattedTime,
    formattedLevel: formattedLevel,
}
