const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
let highestCalorieCount = 0
let currentElfCalorieCount = 0

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

const updateHighestCalorieCount = () => {
    if (currentElfCalorieCount > highestCalorieCount) {
        highestCalorieCount = currentElfCalorieCount
    }
    currentElfCalorieCount = 0
}

lineReader.on('line', line => {
    if (line === '') {
        updateHighestCalorieCount()
    } else {
        currentElfCalorieCount += +line
    }
});

lineReader.on('close', () => {
    updateHighestCalorieCount()

    console.info('Highest calorie count is:', highestCalorieCount)
})
