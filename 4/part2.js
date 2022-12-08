const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
let overlappingCount = 0

const parseRange = (range) => {
    const boundaries = range.split("-").map(b => parseInt(b))
    return boundaries
}

const areOverlapping = (ranges) => {
    const firstMin = ranges[0][0]
    const firstMax = ranges[0][1]
    const lastMin = ranges[1][0]
    const lastMax = ranges[1][1]

    const firstOverlapsWithSecond = isWithinRange(firstMin, ranges[1]) || isWithinRange(firstMax, ranges[1])
    const lastOverlapsWithFirst = isWithinRange(lastMin, ranges[0]) || isWithinRange(lastMax, ranges[0])

    return firstOverlapsWithSecond || lastOverlapsWithFirst
}

const isWithinRange = (value, range) => {
    return value >= range[0] && value <= range[1]
}

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

lineReader.on('line', line => {
    const ranges = line.split(",").map(r => parseRange(r))
    overlappingCount += areOverlapping(ranges) ? 1 : 0
});

lineReader.on('close', () => {
    console.info('Number of non-overlapping ranges:', overlappingCount)
})
