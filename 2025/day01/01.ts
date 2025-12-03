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

let position = 50;
let zeroes = 0;

for await (const line of rl) {
  const direction = line[0];
  const amount = parseInt(line.slice(1));

  switch (direction) {
    case "R":
      position += amount;
      break;
    case "L":
      position -= amount;
      break;
    default:
      break;
  }

  position = position % 100;

  if (position === 0) zeroes++;
}

console.log("Final Result:", zeroes);
