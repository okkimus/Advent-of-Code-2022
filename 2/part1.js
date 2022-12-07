const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
let totalScore = 0
const pointsPerWin = 6
const pointsPerDraw = 3
const pointsPerLosing = 0

const hands = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors"
}

const calculateScoreForRound = (my, opponents) => {
    const handScore = my === "rock" ? 1 : my === "paper" ? 2 : 3

    if (my === "rock" && opponents === "scissors") {
        return pointsPerWin + handScore
    } else if (my === "scissors" && opponents === "paper") {
        return pointsPerWin + handScore
    } else if (my === "paper" && opponents === "rock") {
        return pointsPerWin + handScore
    } else if (my === opponents) {
        return pointsPerDraw + handScore
    }

    return pointsPerLosing + handScore
}

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

lineReader.on('line', line => {
    const round = line.split(" ")
    const opponent = round[0]
    const my = round[1]
    const roundScore = calculateScoreForRound(hands[my], hands[opponent])

    totalScore += roundScore
});

lineReader.on('close', () => {
    console.info('Score is:', totalScore)
})
