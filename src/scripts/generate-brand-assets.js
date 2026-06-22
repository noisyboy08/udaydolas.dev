/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '..', '..', 'public');
const tempDir = path.join(publicDir, 'ud-brand');

// Create temp directory
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// 1. ud-icon.svg
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Black rounded background -->
  <rect width="512" height="512" rx="80" fill="black" />
  <!-- UD logo path -->
  <g transform="translate(0, 128)">
    <path
      fill="white"
      d="M48 256H0V0h48v256ZM224 256H176V0h48v256ZM176 256H48V208h128v48ZM320 256H272V0h48v256ZM464 48H320V0h144v48ZM464 256H320V208h144v48ZM512 208H464V48h48v160Z"
    />
  </g>
</svg>`;
fs.writeFileSync(path.join(tempDir, 'ud-icon.svg'), iconSvg);

// 2. ud-mark.svg
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="#000000" d="M24 128H0V0h24v128ZM112 128H88V0h24v128ZM88 128H24V104h64v24ZM160 128H136V0h24v128ZM232 24H160V0h72v24ZM232 128H160V104h72v24ZM256 104H232V24h24v80Z"/></svg>`;
fs.writeFileSync(path.join(tempDir, 'ud-mark.svg'), markSvg);

// 3. ud-logotype.svg
const logotypeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 80" fill="#000000">
  <rect x="108" y="0" width="15" height="60"/>
  <rect x="153" y="0" width="15" height="60"/>
  <rect x="108" y="45" width="60" height="15"/>
  <rect x="188" y="0" width="15" height="60"/>
  <rect x="203" y="0" width="30" height="15"/>
  <rect x="233" y="15" width="15" height="30"/>
  <rect x="203" y="45" width="30" height="15"/>
  <rect x="268" y="0" width="15" height="60"/>
  <rect x="313" y="0" width="15" height="60"/>
  <rect x="283" y="0" width="30" height="15"/>
  <rect x="283" y="30" width="30" height="15"/>
  <rect x="348" y="0" width="15" height="30"/>
  <rect x="393" y="0" width="15" height="30"/>
  <rect x="370" y="30" width="15" height="30"/>
  <rect x="438" y="0" width="15" height="60"/>
  <rect x="453" y="0" width="30" height="15"/>
  <rect x="483" y="15" width="15" height="30"/>
  <rect x="453" y="45" width="30" height="15"/>
  <rect x="518" y="0" width="15" height="60"/>
  <rect x="533" y="0" width="30" height="15"/>
  <rect x="563" y="0" width="15" height="60"/>
  <rect x="533" y="45" width="30" height="15"/>
  <rect x="598" y="0" width="15" height="60"/>
  <rect x="598" y="45" width="45" height="15"/>
  <rect x="658" y="0" width="15" height="60"/>
  <rect x="703" y="0" width="15" height="60"/>
  <rect x="673" y="0" width="30" height="15"/>
  <rect x="673" y="30" width="30" height="15"/>
  <rect x="748" y="0" width="45" height="15"/>
  <rect x="748" y="15" width="15" height="15"/>
  <rect x="778" y="30" width="15" height="15"/>
  <rect x="748" y="45" width="45" height="15"/>
</svg>`;
fs.writeFileSync(path.join(tempDir, 'ud-logotype.svg'), logotypeSvg);

// Run PowerShell Compress-Archive command to zip the folder
const zipPath = path.join(publicDir, 'ud-brand.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  // Use powershell to create zip file
  execSync(`powershell -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${zipPath}' -Force"`);
  console.log('Successfully created ud-brand.zip');
} catch (error) {
  console.error('Failed to zip files using Compress-Archive:', error.message);
  // Try tar as fallback
  try {
    execSync(`tar -a -c -f "${zipPath}" -C "${publicDir}" "ud-brand"`);
    console.log('Successfully created ud-brand.zip using tar');
  } catch (tarError) {
    console.error('Failed to zip files using tar:', tarError.message);
  }
}

// Clean up temp directory
fs.rmSync(tempDir, { recursive: true, force: true });
