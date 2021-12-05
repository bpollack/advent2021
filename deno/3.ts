import { readDataLinesSync, sum } from "./common.ts";

const allReadings = readDataLinesSync("3.txt").map((line) => parseInt(line, 2));
function computeGamma(readings: number[]): number {
  const bitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const reading of readings) {
    for (let idx = 0; idx < bitCounts.length; idx++) {
      bitCounts[idx] += (reading >> idx) & 1;
    }
  }
  return sum(
    bitCounts.map((n, idx) => Math.round(n / readings.length) << idx),
  );
}

function part1() {
  const gamma = computeGamma(allReadings);
  const epsilon = (~gamma) & 4095;
  console.log(`gamma * epsilon = ${gamma * epsilon}`);
}

part1();
