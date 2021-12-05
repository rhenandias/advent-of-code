const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let numbers = [];
  let lines = [];

  let lineIdx = 0;

  // Parse input
  for await (const line of rl) {
    if (!lineIdx++) {
      // Prase numbers to draw
      numbers = line.split(",");
    } else {
      // Parse boards lines
      if (line.length) {
        lines.push(
          line.split(" ").filter((element) => {
            return !isNaN(parseInt(element));
          })
        );
      }
    }
  }

  // Convert the number to integer
  numbers = numbers.map((value) => parseInt(value));
  
  // Determine the boards size using the first board line, assuming a squared board
  let size = lines[0].length;

  // Quantity of boards playing
  let qntBoards = lines.length / size;

  // Generate the boards
  let boards = [];

  for (let boardIdx = 0; boardIdx < qntBoards; boardIdx++) {
    let currentBoard = [];

    for (let line = 0; line < size; line++) {
      let currentLine = [];

      for (let column = 0; column < size; column++) {
        currentLine.push(parseInt(lines[boardIdx * size + line][column]));
      }

      currentBoard.push(currentLine);
    }

    boards.push(currentBoard);
  }

  // Run the game
  let winnerBoard = game(numbers, boards);

  console.log(winnerBoard);
}

function game(numbers, boards) {
  for (const number of numbers) {
    // Check each board for the current number
    for (const board of boards) {
      // Check if this boards has this number
      for (const line of board) {
        let idxOfNumber = line.indexOf(number);

        if (idxOfNumber > -1) {
          line[idxOfNumber] = "X";
        }
      }

      // Check if this board won
      let lineCheck = validateLines(board);
      let columnCheck = validateColumns(board);

      // The board won, calculate the score
      if (columnCheck || lineCheck) {
        console.log(board);
        return score(board, number);
      }
    }
  }
}

function validateLines(board) {
  for (const line of board) {
    let size = line.length;
    let acc = 0;
    for (let i = 0; i < size; i++) {
      if (line[i] === "X") acc++;
      else break;
    }
    if(acc === size) return true;
  }
  return false;
}

function validateColumns(board) {
  let transposed = transpose(board);
  return validateLines(transposed);
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function score(board, lastNumber) {
  let score = 0;

  for (const line of board) {
    for (const column of line) {
      if (column !== "X") score += column;
    }
  }

  return score * lastNumber;
}

processLineByLine();
