import fs from "fs";
import path from "path";
import sharp from "sharp";

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" rx="28" fill="black" />
  <!-- U -->
  <rect x="20" y="36" width="12" height="56" fill="white" />
  <rect x="48" y="36" width="12" height="56" fill="white" />
  <rect x="20" y="80" width="40" height="12" fill="white" />
  <!-- D -->
  <rect x="72" y="36" width="12" height="56" fill="white" />
  <rect x="84" y="36" width="24" height="12" fill="white" />
  <rect x="84" y="80" width="24" height="12" fill="white" />
  <rect x="96" y="48" width="12" height="32" fill="white" />
</svg>`;

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write favicon.svg
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), svgContent);
  console.log("Wrote favicon.svg");

  const buffer = Buffer.from(svgContent);

  // 2. Generate favicon.ico (32x32)
  await sharp(buffer)
    .resize(32, 32)
    .toFile(path.join(publicDir, "favicon.ico"));
  console.log("Generated favicon.ico");

  // 3. Generate apple-touch-icon.png (180x180)
  await sharp(buffer)
    .resize(180, 180)
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("Generated apple-touch-icon.png");

  // 4. Generate icon-192x192.png (192x192)
  await sharp(buffer)
    .resize(192, 192)
    .toFile(path.join(publicDir, "icon-192x192.png"));
  console.log("Generated icon-192x192.png");

  // 5. Generate icon-512x512.png (512x512)
  await sharp(buffer)
    .resize(512, 512)
    .toFile(path.join(publicDir, "icon-512x512.png"));
  console.log("Generated icon-512x512.png");

  // 6. Generate maskable-icon.png (512x512)
  await sharp(buffer)
    .resize(512, 512)
    .toFile(path.join(publicDir, "maskable-icon.png"));
  console.log("Generated maskable-icon.png");
}

main().catch(console.error);
