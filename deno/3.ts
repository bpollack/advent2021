import { readDataLines } from "./common.ts";

const bitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let lineCount = 0;
for await (const bits of readDataLines("3.txt")) {
  lineCount += 1;
  const v = parseInt(bits, 2);
  for (let idx = 0; idx < bits.length; idx++) {
    bitCounts[idx] += (v >> idx) & 1;
  }
}
const gamma = parseInt(
  bitCounts.reverse().map((n) => Math.round(n / lineCount)).join(""),
  2,
);
const epsilon = (~gamma) & 4095;
console.log(`gamma * epsilon = ${gamma * epsilon}`);
