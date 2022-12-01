const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lastValue = 0;
  let increases = 0;

  for await (const line of rl) {
    const valorAtual = parseInt(line);

    if (valorAtual > lastValue) increases++;

    lastValue = valorAtual;
  }

  // O primeiro incremento não é valido, portanto considerar a resposta com uma subtração -1
  console.log("Incrementos identificados:", increases - 1);
}

processLineByLine();
