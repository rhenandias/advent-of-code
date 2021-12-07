const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("test.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let posicoes = [];

  for await (const line of rl) {
    let splited = line.split(",");

    for (const separado of splited) {
      posicoes.push(parseInt(separado));
    }
  }

  posicoes.sort(function(a, b) {
    return a - b;
  });

  console.log(posicoes);

  let mediana = 0;

  if(posicoes.length % 2 == 0){
    let meio = posicoes.length / 2;
    mediana = (posicoes[meio] + posicoes[meio+1])/ 2
  } else {
    let meio = Math.ceil(posicoes.length /2)
    mediana = posicoes[meio];
  }
  console.log("Mediana:", mediana);

  let soma = 0;

  for(const pos of posicoes){
    let passos = Math.abs(pos - mediana);

    let gasto = 0;

    // console.log("Quantidade de passos:", passos);
    for(let i = 1; i <= passos; i++){
      // console.log(`i = ${i}`);
      gasto += i;
    }
    // console.log(`Pos: ${pos} - Gasto: ${gasto}`);
    soma += gasto;
  }

  console.log("Valor gasto:", soma);
}
  
processLineByLine();
