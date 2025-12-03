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

let acc = 0;

for await (const bank of rl) {
  let first = -1;
  let second = -1;

  const joltages = bank.split("").map((joltage) => Number(joltage));

  joltages.forEach((joltage, index) => {
    if (joltage > first && index < joltages.length - 1) {
      first = joltage;
      second = -1;
    } else if (joltage > second) {
      second = joltage;
    }
  });

  acc += Number(`${first}${second}`);
}

console.log("Final Result:", acc);
