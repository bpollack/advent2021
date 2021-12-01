import { path, slidingWindows } from "./deps.ts";
const root = path.dirname(
  Deno.build.os === "windows"
    ? path.win32.fromFileUrl(import.meta.url)
    : path.posix.fromFileUrl(import.meta.url),
);
const nums = Deno.readTextFileSync(path.join(root, "..", "data", "1.txt"))
  .split("\n").map((n) => parseInt(n, 10));
let jumps = 0;
let last = nums[0];
for (const num of nums) {
  if (num > last) {
    jumps++;
  }
  last = num;
}
console.log(`First part: ${jumps}`);

jumps = 0;
last = nums[0] + nums[1] + nums[2];
for (const triplet of slidingWindows(nums, 3)) {
  const sum = triplet[0] + triplet[1] + triplet[2];
  if (sum > last) {
    jumps++;
  }
  last = sum;
}
console.log(`Second part: ${jumps}`);
