const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let numbers = [];

  for await (const line of rl) {
    numbers.push(line);
  }

  // Determine the size of input numbers, assuming that all the values has the same size
  let size = numbers[0].length;

  // Initialize the weight arrays
  let onesWeight = [];
  let zerosWeight = [];

  for (let i = 0; i < size; i++) {
    onesWeight.push(0);
    zerosWeight.push(0);
  }

  // Count ocurrences
  numbers.forEach((number) => {
    [...number].forEach((digit, idx) => {
      digit === "0" ? zerosWeight[idx]++ : onesWeight[idx]++;
    });
  });

  // Generate gamma and epsilon rates
  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < size; i++) {
    gamma += onesWeight[i] > zerosWeight[i] ? "1" : "0";
    epsilon += onesWeight[i] < zerosWeight[i] ? "1" : "0";
  }

  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  console.log("Gamma:", gamma);
  console.log("Epsilon:", epsilon);
  console.log("Power:", gamma * epsilon);
}

processLineByLine();
