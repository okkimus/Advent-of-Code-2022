const fs = require('fs')
const { dirname } = require('path')
const readline = require('readline')

const createDirDefinition = (name, parent) => {
  return { name, dirs: [], filesSize: 0, parentDir: parent, contentsRead: false }
}

const inputPath = './input.txt'
const root = createDirDefinition("/", null)
const directoryMaxSize = 100000
let currentDir = root

const actOnCommand = (line) => {
  const [_, command, target] = line.split(" ")

  if (command === "cd") {
    if (target === "/") {
      currentDir = root
    } else if (target === "..") {
      currentDir = currentDir.parentDir
    } else {
      currentDir = currentDir.dirs.find(d => d.name === target)
    }
  } else if (command === "ls") {
    currentDir.contentsRead = true // Or they will be when output is handled
  }
}

const actOnOutput = (line) => {
  const [first, second] = line.split(" ")

  if (first === "dir") {
    if (!currentDir.dirs.includes(second)) {
      currentDir.dirs.push(createDirDefinition(second, currentDir))
    }
  } else {
    const size = parseInt(first)
    currentDir.filesSize += size
  }
}

const lineReader = readline.createInterface({
  input: fs.createReadStream(inputPath)
});

lineReader.on('line', line => {
  if (line[0] === "$") {
    actOnCommand(line)
  } else {
    actOnOutput(line)
  }
});

const part1 = (dir) => {
  if (dir.dirs.length === 0) {
    // [currentDirSize, total of dirs at most directoryMaxSize]
    return [dir.filesSize, dir.filesSize <= directoryMaxSize ? dir.filesSize : 0]
  } else {
    const totalSizeSoFar = dir.dirs.map(d => part1(d)[1]).reduce((total, curr) => total + curr)
    const innerDirsTotalSize = dir.dirs.map(d => part1(d)[0]).reduce((total, curr) => total + curr)
    const dirTotalSize = dir.filesSize + innerDirsTotalSize
    return [dirTotalSize, dirTotalSize <= directoryMaxSize ? dirTotalSize + totalSizeSoFar : totalSizeSoFar]
  }
}

const part2 = (dir, goal) => {
  if (dir.dirs.length === 0) {
    return [dir.filesSize, dir.filesSize >= goal ? dir.filesSize : Number.MAX_SAFE_INTEGER - 1]
  } else {
    const recursionCall = dir.dirs.map(d => part2(d, goal))
    const smallestDirSizeToDelete = Math.min(...recursionCall.map(d => d[1]))
    const innerDirsTotalSize = recursionCall.map(d => d[0]).reduce((total, curr) => total + curr)
    const dirTotalSize = dir.filesSize + innerDirsTotalSize

    return [dirTotalSize, dirTotalSize >= goal && dirTotalSize < smallestDirSizeToDelete ? dirTotalSize : smallestDirSizeToDelete]
  }
} 

lineReader.on('close', () => {
  const [rootSize, answer1] = part1(root)
  console.log("Part 1:", answer1)

  const diskSize = 70000000
  const neededSpace = 30000000
  const currentlyAvailable = diskSize - rootSize
  const neededToDelete = neededSpace - currentlyAvailable

  const [_, answer2] = part2(root, neededToDelete)
  console.log("Part 2:", answer2)
  console.log("Goal:", neededToDelete)
  console.log("Diff:", answer2 - neededToDelete)
})
