const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
let top3Calories = []
let currentElfCalorieCount = 0

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

const updateHighestCalorieCounts = () => {
    if (top3Calories.length < 3) {
        top3Calories.push(currentElfCalorieCount)
        top3Calories.sort()
    } else {
        const isInTop3 = currentElfCalorieCount > top3Calories[0]

        if (isInTop3) {
            top3Calories[0] = currentElfCalorieCount
            top3Calories.sort()
        }
    }

    currentElfCalorieCount = 0
}

lineReader.on('line', line => {
    if (line === '') {
        updateHighestCalorieCounts()
    } else {
        currentElfCalorieCount += +line
    }
});

lineReader.on('close', () => {
    updateHighestCalorieCounts()

    const sumOfTop3 = top3Calories.reduce((sum, current) => sum + current)
    console.info('Top3 calories summed:', sumOfTop3)
})
