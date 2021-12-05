import { readDataLinesSync, sum } from "./common.ts";

const allReadings = readDataLinesSync("3.txt").map((line) => parseInt(line, 2));

function bitCounts(readings: number[]): number[] {
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const reading of readings) {
    for (let idx = 0; idx < counts.length; idx++) {
      counts[idx] += (reading >> idx) & 1;
    }
  }
  return counts;
}

function computeGamma(readings: number[]): number {
  return sum(
    bitCounts(readings).map((n, idx) => Math.round(n / readings.length) << idx),
  );
}

function computeEpsilon(readings: number[]): number {
  return (~sum(
    bitCounts(readings).map((n, idx) =>
      (-Math.round(-n / readings.length)) << idx
    ),
  )) & 4095;
}

function part1() {
  console.log(
    `gamma * epsilon = ${
      computeGamma(allReadings) * computeEpsilon(allReadings)
    }`,
  );
}

part1();
