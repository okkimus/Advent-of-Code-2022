const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
let fullyOverlappingRangeCount = 0

const parseRange = (range) => {
    const boundaries = range.split("-").map(b => parseInt(b))
    return boundaries
}

const areOverlapping = (ranges) => {
    const firstRangeInsideSecond = ranges[0][0] >= ranges[1][0] && ranges[0][1] <= ranges[1][1]
    const secondRangeInsideFirst = ranges[0][0] <= ranges[1][0] && ranges[0][1] >= ranges[1][1]

    return firstRangeInsideSecond || secondRangeInsideFirst
}

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

lineReader.on('line', line => {
    const ranges = line.split(",").map(r => parseRange(r))
    fullyOverlappingRangeCount += areOverlapping(ranges) ? 1 : 0
});

lineReader.on('close', () => {
    console.info('Number of fully overlapping ranges:', fullyOverlappingRangeCount)
})
