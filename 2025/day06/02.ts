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
const operations: string[] = [];

for await (const line of rl) {
  if (line.length === 0) continue;

  const elements = line.split("");

  elements.forEach((el, idx) => {
    if (["*", "+"].includes(el)) {
      operations.push(el);
      return;
    }

    if (exercises.length - 1 >= idx) {
      exercises[idx] = [...exercises[idx], el];
    } else {
      exercises.push([el]);
    }
  });
}

const cleaned = exercises.map((el) => el.join("")).map((el) => Number(el));

const grouped: number[][] = [];

let group: number[] = [];

for (let i = 0; i < cleaned.length; i++) {
  const el = cleaned[i];

  if (el !== 0 && i < cleaned.length) {
    group.push(el);
  }

  if (el == 0 || i === cleaned.length - 1) {
    grouped.push(group);
    group = [];
  }
}

const results: number[] = [];

grouped.forEach((values, idx) => {
  const operation = operations[idx];

  if (operation === "*") {
    results.push(
      values.reduce((a, v) => a * Number(v), Number(values.shift()))
    );
  } else if (operation === "+") {
    results.push(values.reduce((a, v) => a + Number(v), 0));
  }
});

let result = results.reduce((a, v) => a + v, 0);

console.log("Final Result:", result);
