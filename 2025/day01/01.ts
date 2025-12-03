import fs from "fs";
import readline from "readline";

const fileStream = fs.createReadStream("./input.txt");

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
