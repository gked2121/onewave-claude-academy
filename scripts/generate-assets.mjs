import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function generate() {
  const faviconSvg = readFileSync(join(publicDir, 'favicon.svg'));
  const ogSvg = readFileSync(join(publicDir, 'og-image.svg'));

  // Generate favicon PNGs
  await sharp(faviconSvg).resize(16, 16).png().toFile(join(publicDir, 'favicon-16x16.png'));
  console.log('Generated favicon-16x16.png');

  await sharp(faviconSvg).resize(32, 32).png().toFile(join(publicDir, 'favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  await sharp(faviconSvg).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  await sharp(faviconSvg).resize(192, 192).png().toFile(join(publicDir, 'favicon-192x192.png'));
  console.log('Generated favicon-192x192.png');

  await sharp(faviconSvg).resize(512, 512).png().toFile(join(publicDir, 'favicon-512x512.png'));
  console.log('Generated favicon-512x512.png');

  // Generate OG image PNG (1200x630)
  await sharp(ogSvg).resize(1200, 630).png().toFile(join(publicDir, 'og-image.png'));
  console.log('Generated og-image.png');

  console.log('All assets generated!');
}

generate().catch(console.error);
