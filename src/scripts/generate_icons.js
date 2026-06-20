const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, '../../public/favicon.svg');
const publicDir = path.join(__dirname, '../../public');

async function generate() {
  try {
    console.log('Generating PNG icons from SVG...');
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(svgPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('Generated apple-touch-icon.png');

    // Generate icon-192x192.png (192x192)
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192x192.png'));
    console.log('Generated icon-192x192.png');

    // Generate icon-512x512.png (512x512)
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512x512.png'));
    console.log('Generated icon-512x512.png');

    // Generate maskable-icon.png (512x512)
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'maskable-icon.png'));
    console.log('Generated maskable-icon.png');

    // Generate a 32x32 png for favicon.ico
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Generated favicon.ico (32x32 PNG format)');

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generate();
