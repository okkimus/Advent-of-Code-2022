const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
const minLowercaseCharCode = 97
const maxLowercaseCharCode = 97 + 26
const minUppercaseCharCode = 65
const maxUppercaseCharCode = 65 + 26
let totalPriority = 0
let currentGroup = []

const getPriority = (charCode) => {
    if (charCode >= minLowercaseCharCode && charCode <= maxLowercaseCharCode) {
        return charCode - minLowercaseCharCode + 1
    } else if (charCode >= minUppercaseCharCode && charCode <= maxUppercaseCharCode) {
        return charCode - minUppercaseCharCode + 1 + 26
    }
}

const findBadge = (firstRugsack, secondRugsack, thirdRugsack) => {
    let i = j = k = 0

    while (i < firstRugsack.length && j < secondRugsack.length && k < thirdRugsack.length) {
        const first = firstRugsack[i]
        const second = secondRugsack[j]
        const third = thirdRugsack[k]

        if (first === second && third === first) {
            return first
        } else if (first >= second && third >= second) {
            j++
        } else if (second >= first && third >= first) {
            i++
        } else {
            k++
        }
    }

    console.log("Didn't find match in", firstRugsack, "and", secondRugsack, "and", thirdRugsack)

    return 0
}

const mapToIntsAndSortCharacters = (chars) => {
    const mapped = chars.map(c => getPriority(c.charCodeAt()))
    return mapped.sort((a,b) => a - b)
}

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

lineReader.on('line', line => {
    if (currentGroup.length < 3) {
        currentGroup.push(line)
    }
    if (currentGroup.length === 3) {
        totalPriority += findBadge(
            mapToIntsAndSortCharacters(currentGroup[0].split("")),
            mapToIntsAndSortCharacters(currentGroup[1].split("")),
            mapToIntsAndSortCharacters(currentGroup[2].split("")))
        currentGroup = []
    }
});

lineReader.on('close', () => {
    console.info('Total priority:', totalPriority)
})