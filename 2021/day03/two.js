const fs = require("fs");
const readline = require("readline");

function generateWeights(values, target, size) {
  let weights = [];

  for (let i = 0; i < size; i++) {
    weights.push(0);
  }

  values.forEach((number) => {
    [...number].forEach((digit, idx) => {
      if (digit === target) weights[idx]++;
    });
  });

  return weights;
}

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

  // Filter Oxigen Values
  let oxigen = [...numbers];
  let idx = 0;

  while (oxigen.length > 1) {
    let onesWeight = generateWeights(oxigen, "1", size);
    let zerosWeight = generateWeights(oxigen, "0", size);

    oxigen = oxigen.filter((number) => {
      let mostCommon = onesWeight[idx] >= zerosWeight[idx] ? "1" : "0";
      return number[idx] === mostCommon ? true : false;
    });

    idx++;
  }

  // Filter CO2 Values
  let co2 = [...numbers];
  idx = 0;

  while (co2.length > 1) {
    let onesWeight = generateWeights(co2, "1", size);
    let zerosWeight = generateWeights(co2, "0", size);

    co2 = co2.filter((number) => {
      let mostCommon = onesWeight[idx] < zerosWeight[idx] ? "1" : "0";
      return number[idx] === mostCommon ? true : false;
    });

    idx++;
  }

  console.log("Oxigen:", oxigen[0], parseInt(oxigen[0], 2));
  console.log("CO2:", co2[0], parseInt(co2[0], 2));
  console.log("Result:", parseInt(oxigen[0], 2) * parseInt(co2[0], 2));
}

processLineByLine();
