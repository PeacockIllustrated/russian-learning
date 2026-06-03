// Rasterises public/icon.svg into the PNG sizes the manifest and iOS need.
// Run from the project root: `npm i -D sharp && node scripts/gen-icons.mjs`.
import sharp from "sharp";
import { readFileSync } from "node:fs";

const svg = readFileSync("public/icon.svg");
const targets = [
  [192, "public/icon-192.png"],
  [512, "public/icon-512.png"],
  [180, "public/apple-icon-180.png"],
];

for (const [size, out] of targets) {
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log("wrote", out);
}
