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

function countOcurrencies(text: string, sub: string) {
  if (sub.length === 0) return 0;
  return text.split(sub).length - 1;
}

const fileContent = fs.readFileSync(inputFile, "utf8");

const ids = fileContent.trim().split(",");

const invalidIds: number[] = [];

ids.forEach((id) => {
  const [first, second] = id.split("-");

  for (let a = Number(first); a <= Number(second); a += 1) {
    const numberString = a.toString();

    const permutations = [];

    if (numberString.length === 2) {
      if (numberString[0] === numberString[1])
        permutations.push(numberString[0]);
    } else {
      for (let b = 1; b <= numberString.length / 2; b += 1) {
        permutations.push(numberString.slice(0, b));
      }
    }

    permutations.forEach((permutation) => {
      const count = countOcurrencies(numberString, permutation);

      if (numberString.length === count * permutation.length) {
        invalidIds.push(a);
      }
    });
  }
});

const invalidIdsSet = [...new Set(invalidIds)];

const sum = invalidIdsSet.reduce((acc, current) => acc + current, 0);

console.log("Final Result:", sum);
