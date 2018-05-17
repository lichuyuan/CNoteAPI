const formattedTime = (ts) => {
    const d = new Date(ts)
    return d.toLocaleString()
}

const formattedLevelClass = (level) => {
    const levels = {
        0: 'danger',
        1: 'warning',
        2: 'info',
        3: 'success',
    }
    return levels[level]
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
    formattedLevelClass: formattedLevelClass,
    formattedLevel: formattedLevel,
}
