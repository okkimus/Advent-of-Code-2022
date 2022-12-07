const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
const minLowercaseCharCode = 97
const maxLowercaseCharCode = 97 + 26
const minUppercaseCharCode = 65
const maxUppercaseCharCode = 65 + 26
let totalPriority = 0


const splitLine = (line) => {
    const charList = line.split("")
    const middleIndex = charList.length / 2
    const firstPart = charList.slice(0, middleIndex)
    const secondPart = charList.slice(middleIndex)

    return [firstPart, secondPart]
}

const getPriority = (charCode) => {
    if (charCode >= minLowercaseCharCode && charCode <= maxLowercaseCharCode) {
        return charCode - minLowercaseCharCode + 1
    } else if (charCode >= minUppercaseCharCode && charCode <= maxUppercaseCharCode) {
        return charCode - minUppercaseCharCode + 1 + 26
    }
}

const getRugsackPriority = (firstComp, secondComp) => {
    let i = j = 0

    while (i < firstComp.length && j < secondComp.length) {
        const first = firstComp[i]
        const second = secondComp[j]

        if (first === second) {
            return first
        } else if (first > second) {
            j++
        } else {
            i++
        }
    }

    console.log("Didn't find match in", firstComp, "and", secondComp)

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
    const splitted = splitLine(line)
    const firstPart = mapToIntsAndSortCharacters(splitted[0])
    const secondPart = mapToIntsAndSortCharacters(splitted[1])
    const rugsackPrio = getRugsackPriority(firstPart, secondPart)
    totalPriority += rugsackPrio
});

lineReader.on('close', () => {
    console.info('Total priority:', totalPriority)
})