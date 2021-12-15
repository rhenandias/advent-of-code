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

  // Define os tamanhos do mapa
  let xMax = linhas[0].length;
  let yMax = linhas.length;

  console.log("xMax:", xMax);
  console.log("yMax:", yMax);

  // Preenche dinamicamente o mapa
  let mapa = [];
  for (let i = 0; i < yMax; i++) {
    let linha = [];
    for (let j = 0; j < xMax; j++) {
      linha.push(parseInt(linhas[i][j]));
    }
    mapa.push(linha);
  }

  let lowPoints = 0;
  let risk = 0;

  // Processa
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      let atual = mapa[y][x];

      // console.log(`${y}, ${x}, ${atual}`);

      // Canto Superior Esquerdo
      if (x == 0 && y == 0) {
        if (mapa[0][1] > atual && mapa[1][0] > atual) risk += 1 + atual;
      }

      // Canto Superior Direito
      else if (x == xMax - 1 && y == 0) {
        if (mapa[0][xMax - 2] > atual && mapa[1][xMax - 1] > atual)
          risk += 1 + atual;
      }

      // Canto Inferior Esquerdo
      else if (x == 0 && y == yMax - 1) {
        if (mapa[yMax - 2][0] > atual && mapa[yMax - 1][1] > atual)
          risk += 1 + atual;
      }

      // Canto Inferior Direito
      else if (x == xMax - 1 && y == yMax - 1) {
        if (
          mapa[yMax - 2][xMax - 1] > atual &&
          mapa[yMax - 1][xMax - 2] > atual
        )
          risk += 1 + atual;
      }

      // Parede Superior
      else if (y == 0) {
        if (
          mapa[0][x - 1] > atual &&
          mapa[0][x + 1] > atual &&
          mapa[1][x] > atual
        )
          risk += 1 + atual;
      }

      // Parede Inferior
      else if (y == yMax - 1) {
        if (
          mapa[yMax - 1][x - 1] > atual &&
          mapa[yMax - 1][x + 1] > atual &&
          mapa[yMax - 2][x] > atual
        )
          risk += 1 + atual;
      }

      // Parede Esquerda
      else if (x == 0) {
        if (
          mapa[y - 1][0] > atual &&
          mapa[y + 1][0] > atual &&
          mapa[y][1] > atual
        )
          risk += 1 + atual;
      }

      // Parede Direita
      else if (x == xMax - 1) {
        if (
          mapa[y - 1][x] > atual &&
          mapa[y + 1][x] > atual &&
          mapa[y][x - 1] > atual
        )
          risk += 1 + atual;
      }

      // No meio
      else {
        if (
          mapa[y - 1][x] > atual &&
          mapa[y + 1][x] > atual &&
          mapa[y][x - 1] > atual &&
          mapa[y][x + 1] > atual
        )
          risk += 1 + atual;
      }
    }
  }

  console.log("Risk Level:", risk);

  imprime(mapa);
}

processLineByLine();

function imprime(mapa) {
  let linhas = mapa.length;
  let colunas = mapa[0].length;

  for (let i = 0; i < linhas; i++) {
    let linha = "";
    for (let j = 0; j < colunas; j++) {
      linha += mapa[i][j];
    }
    console.log(linha);
  }
}
