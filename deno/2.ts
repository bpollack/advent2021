import { readData } from "./common.ts";

const instructions = readData("2.txt").split("\n").filter((l) =>
  l.trim() !== ""
);

let depth = 0;
let pos = 0;
for (const instruction of instructions) {
  const [direction, amountString] = instruction.split(" ");
  const amount = parseInt(amountString);
  switch (direction) {
    case "forward":
      pos += amount;
      break;
    case "down":
      depth += amount;
      break;
    case "up":
      depth -= amount;
      break;
    default:
      throw new Error(`shouldn't be able to get here: ${direction}`);
  }
}
console.log(`Part 1: depth * pos = ${depth * pos}`);

depth = 0;
pos = 0;
let aim = 0;
for (const instruction of instructions) {
  const [direction, amountString] = instruction.split(" ");
  const amount = parseInt(amountString);
  switch (direction) {
    case "forward":
      pos += amount;
      depth += amount * aim;
      break;
    case "down":
      aim += amount;
      break;
    case "up":
      aim -= amount;
      break;
    default:
      throw new Error(`shouldn't be able to get here: ${direction}`);
  }
}
console.log(`Part 2: depth * pos = ${depth * pos}`);
