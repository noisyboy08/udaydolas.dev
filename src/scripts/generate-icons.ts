import fs from "fs";
import path from "path";
import sharp from "sharp";

// Exact same path data as chanhdai-mark.tsx — this draws the blocky "UD" logo
// U: left vertical + right vertical + bottom bar
// D: left vertical + top bar + right bar + bottom bar
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256" width="512" height="256">
  <!-- Black rounded background -->
  <rect width="512" height="256" rx="40" fill="black" />
  <!-- UD logo path — matches chanhdai-mark.tsx exactly, scaled to fit -->
  <g transform="translate(64, 32) scale(0.75)">
    <path
      fill="white"
      d="M48 256H0V0h48v256ZM224 256H176V0h48v256ZM176 256H48V208h128v48ZM320 256H272V0h48v256ZM464 48H320V0h144v48ZM464 256H320V208h144v48ZM512 208H464V48h48v160Z"
    />
  </g>
</svg>`;

// Square version for icons (UD centered in a square canvas)
const svgSquare = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Black rounded background -->
  <rect width="512" height="512" rx="80" fill="black" />
  <!-- UD logo path — matches chanhdai-mark.tsx exactly, centered vertically -->
  <g transform="translate(0, 128)">
    <path
      fill="white"
      d="M48 256H0V0h48v256ZM224 256H176V0h48v256ZM176 256H48V208h128v48ZM320 256H272V0h48v256ZM464 48H320V0h144v48ZM464 256H320V208h144v48ZM512 208H464V48h48v160Z"
    />
  </g>
</svg>`;

async function main() {
  const publicDir = path.join(process.cwd(), "public");

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write favicon.svg (square version)
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), svgSquare);
  console.log("Wrote favicon.svg");

  const squareBuffer = Buffer.from(svgSquare);

  // 2. Generate favicon.ico (32x32)
  await sharp(squareBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon.ico"));
  console.log("Generated favicon.ico");

  // 3. Generate apple-touch-icon.png (180x180)
  await sharp(squareBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("Generated apple-touch-icon.png");

  // 4. Generate icon-192x192.png (192x192)
  await sharp(squareBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "icon-192x192.png"));
  console.log("Generated icon-192x192.png");

  // 5. Generate icon-512x512.png (512x512)
  await sharp(squareBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "icon-512x512.png"));
  console.log("Generated icon-512x512.png");

  // 6. Generate maskable-icon.png (512x512 with safe-zone padding)
  const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="black" />
  <g transform="translate(56, 168)">
    <path
      fill="white"
      d="M48 256H0V0h48v256ZM224 256H176V0h48v256ZM176 256H48V208h128v48ZM320 256H272V0h48v256ZM464 48H320V0h144v48ZM464 256H320V208h144v48ZM512 208H464V48h48v160Z"
    />
  </g>
</svg>`;
  await sharp(Buffer.from(svgMaskable))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "maskable-icon.png"));
  console.log("Generated maskable-icon.png");
}

main().catch(console.error);
