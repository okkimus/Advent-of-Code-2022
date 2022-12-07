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
    X: "lose",
    Y: "draw",
    Z: "win"
}

const scores = {
    // lose, draw, win
    "rock": [3, 1, 2],
    "paper": [1, 2, 3],
    "scissors": [2, 3, 1],
}

const results = ["lose", "draw", "win"]

const calculateScoreForRound = (wantedResult, opponents) => {
    const resultScore = wantedResult === "lose" ? 0 : wantedResult === "draw" ? 3 : 6
    const handScore = scoreForResultAndOpponentHand(wantedResult, opponents)
    return handScore + resultScore
}

const scoreForResultAndOpponentHand = (result, opponent) => {
    return scores[opponent][results.indexOf(result)]
}

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

lineReader.on('line', line => {
    const round = line.split(" ")
    const opponent = round[0]
    const wantedResult = round[1]
    const roundScore = calculateScoreForRound(hands[wantedResult], hands[opponent])

    totalScore += roundScore
});

lineReader.on('close', () => {
    console.info('Score is:', totalScore)
})
