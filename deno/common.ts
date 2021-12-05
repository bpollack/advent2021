import { path } from "./deps.ts";
import { readLines } from "./deps.ts";
const root = path.dirname(
  Deno.build.os === "windows"
    ? path.win32.fromFileUrl(import.meta.url)
    : path.posix.fromFileUrl(import.meta.url),
);

export function readData(name: string): string {
  return Deno.readTextFileSync(path.join(root, "..", "data", name));
}

export async function* readDataLines(
  filename: string,
): AsyncIterableIterator<string> {
  let file: Deno.File | undefined;
  try {
    file = Deno.openSync(path.join(root, "..", "data", filename), {
      read: true,
    });
    for await (const line of readLines(file)) {
      if (line.trim() !== "") yield line;
    }
  } finally {
    if (file != null) Deno.close(file.rid);
  }
}

export function sum(nums: number[]): number {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  return sum;
}
