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

let result = 0;

const ranges: bigint[][] = [];
const ingredients: bigint[] = [];

for await (const line of rl) {
  if (line.length === 0) continue;

  if (line.includes("-")) {
    const [start, end] = line.split("-");

    ranges.push([BigInt(start), BigInt(end)]);
  } else {
    ingredients.push(BigInt(line));
  }
}

ingredients.forEach((ingredient) => {
  let idx = 0;
  let found = false;

  while (!found && idx < ranges.length) {
    const [start, end] = ranges[idx];

    if (ingredient >= start && ingredient <= end) {
      result += 1;
      found = true;
    }

    idx += 1;
  }
});

console.log("Final Result:", result);
