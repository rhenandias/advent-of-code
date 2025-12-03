import fs from "fs";
import readline from "readline";

const DEBUG = false;

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

let position = 50;
let zeroes = 0;

for await (const line of rl) {
  const direction = line[0];
  const amount = parseInt(line.slice(1));
  const normalized = amount % 100;

  zeroes += amount >= 100 ? Math.trunc(amount / 100) : 0;

  let cycled = false;

  const multiplied = direction === "R" ? normalized * 1 : normalized * -1;

  const initial = position;

  position += multiplied;

  const newPosition = position;

  if (position >= 100) {
    position = position % 100;
    cycled = position !== 0 && initial < 100 && position > 0;
  } else if (position < 0) {
    cycled = position !== 0 && initial > 0 && position < 100;
    position = 100 + position;
  }

  if ((position === 0 && !cycled) || (position !== 0 && cycled)) zeroes += 1;

  if (DEBUG) {
    console.log({
      direction,
      amount,
      normalized,
      multiplied,
      initial,
      newPosition,
      position,
      cycled,
    });
  }
}

console.log("Final Result:", zeroes);
