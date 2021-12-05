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

function part1() {
  const gamma = computeGamma(allReadings);
  console.log(`gamma * epsilon = ${gamma * (~gamma & 4095)}`);
}

function part2() {
  let o2 = allReadings;
  for (let shift = 12; o2.length > 1 && shift >= 0; shift--) {
    const gamma = computeGamma(o2);
    const mask = 1 << shift;
    const maskedGamma = gamma & mask;
    o2 = o2.filter((reading) => (reading & mask) === maskedGamma);
  }
  let co2 = allReadings;
  for (let shift = 12; co2.length > 1 && shift >= 0; shift--) {
    const epsilon = (~computeGamma(co2)) & 4095;
    const mask = 1 << shift;
    const maksedEpsilon = epsilon & mask;
    co2 = co2.filter((reading) => (reading & mask) === maksedEpsilon);
  }
  console.log(`O2 * CO2 = ${o2[0] * co2[0]}`);
}

part1();
part2();
