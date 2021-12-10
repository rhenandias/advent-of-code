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

  // Força estado incial
  peixes = [3];

  let dias = 18;
  let qntd = 5;

  for(const peixe of peixes){
    let geracoes = Math.floor((dias - 1 - peixe)/7) +1;

    console.log(`Peixe: ${peixe}, Criou: ${geracoes}`);

    for(let geracao = 0; geracao < geracoes; geracao++){

      let criado = (peixe + 1 + (geracao * 7));
      console.log(`Peixe criado no dia: ${criado}`);
    }

    console.log("");
  }

}

processLineByLine();

function somaArray(array){
  let soma = 0;
  for(const valor of array) soma += valor;
  return soma;
}
