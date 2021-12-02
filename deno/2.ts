import { readData } from "./common.ts";

const instructions = readData("2.txt").split("\n").filter((l) =>
  l.trim() !== ""
);

let [depth, pos, aim] = [0, 0, 0];
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
console.log(`Part 1: ${aim * pos}\nPart 2: ${depth * pos}`);
