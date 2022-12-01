const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let linhas = [];

  for await (const line of rl) {
    linhas.push(line);
  }

  // Quantidade de dígitos únicos encontrados
  let encontrados = 0;

  // Processa
  for (let linha of linhas) {
    let splited = linha.split("|");

    let digitos = splited[1].split(" ");

    for (let digito of digitos) {
      let tam = digito.length;
      if (tam === 2 || tam === 4 || tam === 3 || tam === 7) encontrados++;
    }
  }

  console.log("Dígitos simples encontrados:", encontrados);
}

processLineByLine();
