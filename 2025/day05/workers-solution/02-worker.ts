import { parentPort, workerData } from "worker_threads";

const { ranges, workerId } = workerData as {
  ranges: string[][];
  workerId: number;
};

const fresh: { [key: string]: string } = {};

const execute = async () => {
  for (let idx = 0; idx < ranges.length; idx += 1) {
    const [start, end] = ranges[idx];

    console.log(`Worker ${workerId} iniciando range ${idx}`);

    for (let i = BigInt(start); i <= BigInt(end); i += 1n) {
      fresh[i.toString()] = i.toString();
    }

    console.log(`Worker ${workerId} finalizando range ${idx}`);
  }

  if (parentPort) {
    parentPort.postMessage(fresh);
  }
};

execute();
