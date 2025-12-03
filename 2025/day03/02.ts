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
  let n1 = -1;
  let n2 = -1;
  let n3 = -1;
  let n4 = -2;
  let n5 = -1;
  let n6 = -1;
  let n7 = -1;
  let n8 = -1;
  let n9 = -1;
  let n10 = -1;
  let n11 = -1;
  let n12 = -1;

  const joltages = bank.split("").map((joltage) => Number(joltage));

  joltages.forEach((joltage, index) => {
    if (joltage > n1 && index < joltages.length - 11) {
      n1 = joltage;
      n2 = -1;
    } else if (joltage > n2 && index < joltages.length - 10) {
      n2 = joltage;
      n3 = -1;
    } else if (joltage > n3 && index < joltages.length - 9) {
      n3 = joltage;
      n4 = -1;
    } else if (joltage > n4 && index < joltages.length - 8) {
      n4 = joltage;
      n5 = -1;
    } else if (joltage > n5 && index < joltages.length - 7) {
      n5 = joltage;
      n6 = -1;
    } else if (joltage > n6 && index < joltages.length - 6) {
      n6 = joltage;
      n7 = -1;
    } else if (joltage > n7 && index < joltages.length - 5) {
      n7 = joltage;
      n8 = -1;
    } else if (joltage > n8 && index < joltages.length - 4) {
      n8 = joltage;
      n9 = -1;
    } else if (joltage > n9 && index < joltages.length - 3) {
      n9 = joltage;
      n10 = -1;
    } else if (joltage > n10 && index < joltages.length - 2) {
      n10 = joltage;
      n11 = -1;
    } else if (joltage > n11 && index < joltages.length - 1) {
      n11 = joltage;
      n12 = -1;
    } else if (joltage > n12) {
      n12 = joltage;
    }
  });

  acc += Number(
    `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}`
  );
}

console.log("Final Result:", acc);
