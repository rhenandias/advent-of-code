const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("test.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let polimero = "";
  let instrucoes = {};

  for await (const line of rl) {
    if (!line.includes("->") && line.length > 0) {
      // Polímero inicial
      polimero = line;
    } else if (line.includes("->")) {
      // Instruções
      let comando = line.split(" -> ");
      instrucoes[comando[0]] = comando[1];
    }
  }

  console.log("Polímero inicial:", polimero);
  console.log("Instruções:", instrucoes);

  for (let instrucao in instrucoes) {
    let novoPolimero = "";
    let inserir = instrucao[0];

    for (let i = 0; i < polimero.length - 1; i++) {
      let par = polimero[i] + polimero[i + 1];
      if(par === instrucao){
        // Inserir elemento neste par
        let trio = par[0] + inserir + par[1];
        novoPolimero += trio;
      } else {
        // Não adicionar nada a este par
        novoPolimero += polimero[i];
      }
    }

    console.log("Fim do ciclo:", novoPolimero);
  
  }

  for (let i = 0; i < polimero.length - 1; i++) {
    let par = polimero[i] + polimero[i + 1];
    console.log("Par:", par);
  }
}

processLineByLine();
