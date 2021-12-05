const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let lines = [];

  for await (const line of rl) {
    lines.push(line);
  }

  let points = {};

  for (line of lines) {
    let splited = line.split(" -> ");

    let [x1, y1] = [
      parseInt(splited[0].split(",")[0]),
      parseInt(splited[0].split(",")[1]),
    ];
    let [x2, y2] = [
      parseInt(splited[1].split(",")[0]),
      parseInt(splited[1].split(",")[1]),
    ];

    if (x1 === x2 || y1 === y2) {
      let covered = coveredPoints(x1, y1, x2, y2);

      for (const point of covered) {
        if (points.hasOwnProperty(point)) {
          points[point] = points[point] + 1;
        } else {
          points[point] = 1;
        }
      }
    }
  }

  console.log(points);

  let result = 0;

  for (const point in points) {
    if (points[point] >= 2) result++;
  }

  console.log("Resultado:", result);
}

function coveredPoints(x1, y1, x2, y2) {
  let deltaX = x2 - x1;
  let deltaY = y2 - y1;

  let dist = distance(x1, y1, x2, y2);

  let xRate = deltaX != 0 ? deltaX / dist : 0;
  let yRate = deltaY != 0 ? deltaY / dist : 0;

  let covered = [];

  for (let i = 0; i <= dist; i++) {
    let x = x1 + i * xRate;
    let y = y1 + i * yRate;

    // Array response
    // covered.push([x, y]);

    // String repsonse
    covered.push(`${x},${y}`);
  }

  // console.log("Covered:", covered);
  // console.log("Dist:", dist);
  // console.log("Dx:", deltaX);
  // console.log("Dy:", deltaY);
  // console.log("Xr:", xRate);
  // console.log("Yr:", yRate);

  return covered;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

processLineByLine();
