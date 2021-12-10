const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let floor = 0;

  for await (const line of rl) {
    for(const command of line){
      (command === "(")? floor++ : floor--;
    }
  }

  console.log("Andar final:", floor);
}

processLineByLine();
