import fs from "fs";

const args = process.argv.slice(2);
let inputFile = "./input.txt";

if (args.includes("--test")) {
  inputFile = "./test.txt";
} else if (args.includes("--input")) {
  inputFile = "./input.txt";
} else if (args.length > 0 && args[0].endsWith(".txt")) {
  inputFile = args[0];
}

const fileContent = fs.readFileSync(inputFile, "utf8");

const ids = fileContent.trim().split(",");

const invalidIds: number[] = [];

ids.forEach((id) => {
  const [first, second] = id.split("-");

  for (let a = Number(first); a <= Number(second); a += 1) {
    const numberString = a.toString();

    if (numberString.length % 2 === 0) {
      const middle = Math.floor(numberString.length / 2);
      const firstHalf = numberString.substring(0, middle);
      const secondHalf = numberString.substring(middle);

      if (firstHalf === secondHalf) invalidIds.push(a);
    }
  }
});

const sum = invalidIds.reduce((acc, current) => acc + current, 0);

console.log("Final Result:", sum);
