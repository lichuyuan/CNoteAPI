const log = console.log.bind(console)

const binarySearch = (array, element) => {
    const length = array.length
    if (length > 0) {
        const index = Math.floor(length / 2)
        const value = array[index]
        log(element, array, value)
        if (element === value) {
            return index
        } else if (element > value) {
            return binarySearch(array.slice(index+1), element)
        } else {
            return binarySearch(array.slice(0, index), element)
        }
    } else {
        return -1
    }
}

const testBinarySearch = () => {
    const l = [3, 4, 5, 7, 9]
    log(binarySearch(l, 4))
}

testBinarySearch()