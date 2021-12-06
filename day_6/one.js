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

  let contagem = 0;

  for (let dia = 0; dia <= 256; dia++) {
    let imprimir = "";
    for (let i = 0; i < peixes.length; i++) {
      imprimir += `${peixes[i]}, `;
    }
    // console.log("Dia:", dia, " - ", imprimir);

    contagem = peixes.length;
    console.log(`Dia: ${dia} - Contagem: ${contagem} - Soma: ${somaArray(peixes)} - Divisão: ${somaArray(peixes)/contagem}`);

    let adicionar = 0;

    for (let i = 0; i < peixes.length; i++) {
      if (peixes[i] == 0) {
        adicionar++;
        peixes[i] = 6;
      } else {
        peixes[i]--;
      }
    }

    if (adicionar > 0) {
      for (let i = 0; i < adicionar; i++) {
        peixes.push(8);
      }
    }
  }

  console.log("Quantidade de peixes:", contagem);
}

processLineByLine();

function somaArray(array){
  let soma = 0;
  for(const valor of array) soma += valor;
  return soma;
}
