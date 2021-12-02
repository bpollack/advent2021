import { path } from "./deps.ts";
const root = path.dirname(
  Deno.build.os === "windows"
    ? path.win32.fromFileUrl(import.meta.url)
    : path.posix.fromFileUrl(import.meta.url),
);

export function readData(name: string): string {
  return Deno.readTextFileSync(path.join(root, "..", "data", name));
}
