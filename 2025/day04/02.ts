import fs from "fs";
import readline from "readline";

const args = process.argv.slice(2);
let inputFile = "./input.txt";

if (args.includes("--test")) {
  inputFile = "./test.txt";
} else if (args.includes("--input")) {
  inputFile = "./input.txt";
} else if (args.length > 0 && args[0].endsWith(".txt")) {
  inputFile = args[0];
}

const fileStream = fs.createReadStream(inputFile);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const rolls = [];

for await (const line of rl) {
  rolls.push(line.split(""));
}

const rows = rolls.length;
const cols = rolls[0].length;

let rollsWithAccess = 0;

let canRemove = true;

while (canRemove) {
  let removedAnyRoll = false;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const tl = row > 0 && col > 0 ? rolls[row - 1][col - 1] : 0;
      const t = row > 0 ? rolls[row - 1][col] : 0;
      const tr = row > 0 && col < cols - 1 ? rolls[row - 1][col + 1] : 0;
      const l = col > 0 ? rolls[row][col - 1] : 0;
      const r = col < cols - 1 ? rolls[row][col + 1] : 0;
      const bl = row < rows - 1 && col > 0 ? rolls[row + 1][col - 1] : 0;
      const b = row < rows - 1 ? rolls[row + 1][col] : 0;
      const br = row < rows - 1 && col < cols - 1 ? rolls[row + 1][col + 1] : 0;

      const around = [tl, t, tr, l, r, bl, b, br];

      const weights: number[] = around.map((symbol) =>
        symbol === "@" ? 1 : 0
      );

      const sum = weights.reduce((acc, value) => acc + value, 0);

      if (sum < 4 && rolls[row][col] === "@") {
        rolls[row][col] = ".";
        rollsWithAccess += 1;
        removedAnyRoll = true;
      }
    }
  }

  canRemove = removedAnyRoll;
}

console.log("Final Result:", rollsWithAccess);
