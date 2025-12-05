import fs from "fs";
import readline from "readline";

import { Worker } from "worker_threads";
import os from "os";

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

const ranges: string[][] = [];

for await (const line of rl) {
  if (line.length === 0) continue;

  if (line.includes("-")) {
    const [start, end] = line.split("-");

    ranges.push([start, end]);
  }
}

// Quantidade de cores disponíveis para processamento
const numCPUs = os.cpus().length;

// Quantidade total de items a serem processados
const dataLengh = ranges.length;

// Quantos items são processados em cada worker
const chunkSize = Math.ceil(dataLengh / numCPUs);

const workers: Worker[] = [];

const workersResults: { [key: string]: string }[] = [];
const fresh: { [key: string]: string } = {};

for (let i = 0; i < numCPUs; i++) {
  // Índice de inicio e final desse worker
  const start = i * chunkSize;
  const end = Math.min(start + chunkSize, dataLengh);

  // Itens separados da base total para esse worker processar
  const chunk = ranges.slice(start, end);

  const worker = new Worker("./02-worker.ts", {
    workerData: { ranges: chunk, workerId: i },
  });

  worker.on("message", (result) => {
    workersResults.push(result);
  });

  workers.push(worker);
}

const execute = async () => {
  await Promise.all(
    workers.map((w) => new Promise((resolve) => w.on("message", resolve)))
  );

  workersResults.forEach((result) => {
    Object.keys(result).map((key) => {
      fresh[key] = key;
    });
  });

  const result = Object.keys(fresh).length;

  console.log("Final Result:", result);
};

execute();
