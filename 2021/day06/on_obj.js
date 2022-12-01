const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("test.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let peixes = [];

  for await (const line of rl) {
    let splited = line.split(",");

    for (const separado of splited) {
      peixes.push(parseInt(separado));
    }
  }

  peixes = {
    0: 3
  };

  let contagem = 0;
  let ultimoIdx = 0;

  for (let dia = 0; dia <= 256; dia++) {

    contagem = Object.keys(peixes).length;

    console.log(`Dia: ${dia} - Contagem: ${contagem}`);

    let adicionar = 0;

    for (let i = 0; i < contagem; i++) {
      if (peixes[i] == 0) {
        adicionar++;
        peixes[i] = 6;
      } else {
        peixes[i] = peixes[i] - 1;
      }
    }

    if (adicionar > 0) {
      for (let i = 0; i < adicionar; i++) {
        peixes[++ultimoIdx] = 8;
      }
    }
  }

  console.log("Quantidade de peixes:", contagem);
  // console.log(peixes);
}

processLineByLine();

function somaArray(array){
  let soma = 0;
  for(const valor of array) soma += valor;
  return soma;
}