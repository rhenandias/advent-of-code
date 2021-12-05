const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let commands = [];

  for await (const line of rl) {
    commands.push(line);
  }

  let horizontal = 0;
  let vertical = 0;

  for (let i = 0; i < commands.length; i++) {
    let command = commands[i].split(" ");

    switch (command[0]) {
      case "forward":
        horizontal += parseInt(command[1]);
        break;
      case "down":
        vertical += parseInt(command[1]);
        break;
      case "up":
        vertical -= parseInt(command[1]);
        break;
    }
  }

  console.log("Horizontal:", horizontal);
  console.log("Vertical:", vertical);
  console.log("Resultado:", horizontal * vertical);
}

processLineByLine();
