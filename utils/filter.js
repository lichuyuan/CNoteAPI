const time = (ts) => {
    const d = new Date(ts)
    return d.toLocaleString()
}

module.exports = {
    time,
}
