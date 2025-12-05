import fs from "fs";
import readline from "readline";

const args = process.argv.slice(2);
let inputFile = "./input.txt";

if (args.includes("--test")) {
  inputFile = "./test.txt";
} else if (args.includes("--input")) {
  inputFile = "./input.txt";
} else if (args.length > 0 && args[0].endsWith(".txt")) {
  inputFile = args[0];
}

const fileStream = fs.createReadStream(inputFile);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const ranges: number[][] = [];

for await (const line of rl) {
  if (line.length === 0) continue;

  if (line.includes("-")) {
    const [start, end] = line.split("-");

    ranges.push([Number(start), Number(end)]);
  }
}

// Ordena os intervalos em ordem crescente pelo valor inicial
ranges.sort((a, b) => {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
});

// Array para armazenar os intervalos já mesclados (sem sobreposições)
let rangesToCount: number[][] = [];

// Percorre cada intervalo e tenta estendê-lo consumindo intervalos subsequentes que se sobrepõem
for (let i = 0; i < ranges.length; i += 1) {
  // Inicia um novo intervalo mesclado com os valores do intervalo atual
  let [startToCount, endToCount] = ranges[i];

  // Continua tentando expandir o intervalo atual enquanto houver sobreposição
  while (true) {
    // Caso especial: se chegou ao último intervalo, apenas garante que pegamos o maior fim
    if (i === ranges.length - 1) {
      const [lastStart, lastEnd] = ranges[i];
      endToCount = Math.max(endToCount, lastEnd);
      break;
    }

    let [start, end] = ranges[i];
    let [nextStart, nextEnd] = ranges[i + 1];

    // Verifica se o próximo intervalo NÃO se sobrepõe ao intervalo atual
    // Se o fim do intervalo atual é menor que o início do próximo, não há sobreposição
    if (endToCount < nextStart) {
      // Finaliza o intervalo atual, não há mais sobreposições possíveis
      break;
    }

    // Há sobreposição! Expande o fim do intervalo para incluir o próximo
    // Usa Math.max para pegar o maior fim entre o atual, o corrente e o próximo
    endToCount = Math.max(endToCount, end, nextEnd);

    // Avança para o próximo intervalo (ele foi consumido/mesclado)
    i++;
  }

  // Salva o intervalo mesclado resultante
  rangesToCount.push([startToCount, endToCount]);
}

// Calcula o total de IDs únicos somando o tamanho de cada intervalo mesclado
// Para um intervalo [a, b], o tamanho é (b - a + 1) pois os extremos são inclusivos
const total = rangesToCount.reduce(
  (acc, val) => acc + (val[1] - val[0] + 1),
  0
);

console.log("Final Result:", total);
