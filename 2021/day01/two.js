const fs = require("fs");
const readline = require("readline");

function slidingWindow(values, start, factor) {
  let window = 0;

  for (let i = 0; i < factor; i++) {
    window += values[start + i];
  }

  return window;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let values = [];

  for await (const line of rl) {
    values.push(parseInt(line));
  }

  let increases = 0;

  for (let i = 0; i < values.length; i++) {
    if (i < values.length - 3) {
      const first = slidingWindow(values, i, 3);
      const second = slidingWindow(values, i + 1, 3);

      if (second > first) increases++;
    }
  }

  console.log("Incrementos localizados:", increases);
}

processLineByLine();
