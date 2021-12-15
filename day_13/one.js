const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let coordenadas = [];
  let cortes = [];
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
    } else {
      if (line !== "") cortes.push(line);
    }
  }

  const xMax = x.reduce(function (a, b) {
    return Math.max(a, b);
  });

  const yMax = y.reduce(function (a, b) {
    return Math.max(a, b);
  });

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

  // Passa por cada uma das instruções
  for (let corte of cortes) {
    let splited = corte.split("=");

    // Adquire o eixo e o valor da dobradura
    let eixo = splited[0][splited[0].length - 1];
    let valor = parseInt(splited[1]);

    // Realiza dobradura
    eixo === "x" ? foldX(valor, tabuleiro) : foldY(valor, tabuleiro);

    // Conta os pontos
    let pontos = conta(tabuleiro);

    console.log(
      `Dobrando em ${eixo}=${valor}, Pontos após dobradura: ${pontos}`
    );
  }

  console.log("Tabuleiro final:");
  imprime(tabuleiro); HEJHJRCJ
}

processLineByLine();

function foldY(y, tabuleiro) {
  // Percorre as linhas do tabuleiro, partindo do final até chegar na linha do corte
  for (let linha = tabuleiro.length - 1; linha >= y; linha--) {
    // Percorre cada elemento da linha atual
    for (let coluna = 0; coluna < tabuleiro[linha].length; coluna++) {
      // Reposicionar o elemento atual dessa linha

      // Calcula a distância atual até o corte
      let novaLinha = y - (linha - y);

      // Reposiciona
      tabuleiro[novaLinha][coluna] += tabuleiro[linha][coluna];
    }
    // Remove a linha atual, que após ser reposicionada, deve ser removida do tabuleiro
    tabuleiro.pop();
  }
}

function foldX(x, tabuleiro) {
  // Percorre as colunas do tabuleiro do final até chegar na coluna do corte
  for (let coluna = tabuleiro[0].length - 1; coluna >= x; coluna--) {
    // Percorre cada linha da coluna
    for (let linha = 0; linha < tabuleiro.length; linha++) {
      // Reposiciona o elemento atual

      // Calcula a distância atual até o corte
      let novaColuna = x - (coluna - x);

      // Reposiciona
      tabuleiro[linha][novaColuna] += tabuleiro[linha][coluna];

      tabuleiro[linha].pop();
    }
  }
}

function imprime(tabuleiro) {
  let linhas = tabuleiro.length;
  let colunas = tabuleiro[0].length;

  for (let i = 0; i < linhas; i++) {
    let linha = "";
    for (let j = 0; j < colunas; j++) {
      // linha += tabuleiro[i][j];
      linha += tabuleiro[i][j] >= 1 ? "#" : ".";
    }
    console.log(linha);
  }
}

function conta(tabuleiro) {
  let soma = 0;
  for (let linha of tabuleiro) {
    for (let coluna of linha) {
      soma += coluna === 0 ? 0 : 1;
    }
  }

  return soma;
}
