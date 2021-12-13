const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("test.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let coordenadas = [];
  let x = [];
  let y = [];

  for await (const line of rl) {
    if (!line.includes("fold") && line !== "") {
      let splited = line.split(",");

      const _x = parseInt(splited[0]);
      const _y = parseInt(splited[1]);

      coordenadas.push([_x, _y]);

      x.push(_x);
      y.push(_y);
    }
  }

  const xMax = x.reduce(function (a, b) {
    return Math.max(a, b);
  });

  const yMax = y.reduce(function (a, b) {
    return Math.max(a, b);
  });

  console.log("Tamanho máximo em X:", xMax);
  console.log("Tamanho máximo em Y:", yMax);

  // Inicializa tabuleiro vazio
  let tabuleiro = [];

  for (let i = 0; i < yMax + 1; i++) {
    let linha = [];
    for (let j = 0; j < xMax + 1; j++) {
      linha.push(0);
    }
    tabuleiro.push(linha);
  }

  
  // Preenche tabuleiro inicial
  for (const coordenada of coordenadas) {
    tabuleiro[coordenada[1]][coordenada[0]] = 1;
  }

  imprime(tabuleiro);

}

processLineByLine();

function imprime(tabuleiro){
  let linhas = tabuleiro.length;
  let colunas = tabuleiro[0].length;

  for(let i = 0; i < linhas; i++){
    let linha = "";
    for (let j = 0; j < colunas; j++){
      linha += tabuleiro[i][j];
    }
    console.log(linha);
  }
}