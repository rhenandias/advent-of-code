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

const exercises: string[][] = [];

for await (const line of rl) {
  if (line.length === 0) continue;

  const elements = line
    .trim()
    .split(" ")
    .filter((el) => el.trim().length)
    .map((el) => el.trim());

  elements.forEach((el, idx) => {
    if (exercises.length - 1 >= idx) {
      exercises[idx] = [...exercises[idx], el];
    } else {
      exercises.push([el]);
    }
  });
}

const results: number[] = [];

exercises.forEach((symbols) => {
  const operation = symbols.pop();

  if (operation === "*") {
    results.push(
      symbols.reduce((a, v) => a * Number(v), Number(symbols.shift()))
    );
  } else if (operation === "+") {
    results.push(symbols.reduce((a, v) => a + Number(v), 0));
  }
});

let result = results.reduce((a, v) => a + v, 0);

console.log("Final Result:", result);
