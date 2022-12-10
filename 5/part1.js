const fs = require('fs')
const readline = require('readline')

const inputPath = './input.txt'
const boxes = []
let readingStacks = true
const stackCount = 9

const lineReader = readline.createInterface({
    input: fs.createReadStream(inputPath)
});

const readInstruction = (line) => {
  const split = line.split(" ")
  return {
    count: split[1],
    from: split[3] - 1,
    to: split[5] - 1
  }
}

const findHighestItemPosition = (col) => {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i][col] === ' ') {
      return [i - 1, col]
    }  
  }
  return [boxes.length - 1, col]
}

const popItem = (coords) => {
  const item = boxes[coords[0]][coords[1]]
  boxes[coords[0]][coords[1]] = " "
  return item
}

const addItemToStack = (item, col) => {
  const highestItemPos = findHighestItemPosition(col)

  if (highestItemPos[0] === boxes.length - 1) {
    boxes.push(createEmptyRow())
  }

  boxes[highestItemPos[0] + 1][col] = item
}

const createEmptyRow = () => {
  const row = []
  for (let i = 0; i < stackCount; i++) {
    row.push(" ")
  }
  return row
}

lineReader.on('line', line => {
  if (readingStacks) {
    if (line[0] == " ") {
      readingStacks = false
      boxes.reverse()
      return
    }

    const row = []
    for (let i = 0; i < stackCount; i++) {
      const item = line[i * 4 + 1]
      row.push(item)
    }

    boxes.push(row)
  } else {
    const instruction = readInstruction(line)
    for (let i = 0; i < instruction.count; i++) {
      const itemToMove = popItem(findHighestItemPosition(instruction.from))
      addItemToStack(itemToMove, instruction.to)
    }
  }
});

lineReader.on('close', () => {
  let answer = ""
  for (let i = 0; i < stackCount; i++) {
    answer += boxes[findHighestItemPosition(i)[0]][i]
  }

  console.info('Boxes on the top are:', answer)
})
