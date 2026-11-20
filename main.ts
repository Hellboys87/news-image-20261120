// Entry program for make.fun news-image-20261120.
//
// The artwork is a finished image that lives in this repository as
// entry.png, so this program's only job is to place an exact copy of it
// where the grader expects it. It does no drawing, no network calls and
// no writes anywhere else. Because it is a plain byte-for-byte copy, the
// two runs the grader performs always produce identical output.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// program works no matter which directory it is started from.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// The grader sets MAKEFUN_OUTPUT_DIR; fall back to /output when it is
// absent, matching the competition's documented behaviour.
const targetDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(targetDir, { recursive: true });

if (!existsSync(source)) {
  throw new Error("entry.png is missing from the repository root");
}

const destination = join(targetDir, "entry.png");
copyFileSync(source, destination);

// Sanity check: the copy must be the same size as the source, so a
// truncated or partial write fails loudly instead of being graded.
if (statSync(source).size !== statSync(destination).size) {
  throw new Error("entry.png copy is incomplete");
}
