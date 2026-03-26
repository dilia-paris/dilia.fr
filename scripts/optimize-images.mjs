import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const ASSETS_DIR = 'src/assets';
const WEBP_OUTPUT_DIR = 'src/assets/webp';

// Images flagged by Lighthouse as needing optimization
const CRITICAL_IMAGES = [
  'src/assets/dilia/DILIA-2024-michele.jpg',   // 35.66 MB - HERO IMAGE
  'src/assets/cave/vin.JPG',                    // 3.83 MB
  'src/assets/cave/histoire.JPG',               // 3.18 MB
  'src/assets/dilieta/pizza-fritta.JPG',        // 2.84 MB
  'src/assets/cave/1.JPG',
  'src/assets/cave/2.JPG',
  'src/assets/cave/3.JPG',
  'src/assets/cave/4.JPG',
  'src/assets/cave/5.JPG',
  'src/assets/cave/6.JPG',
  'src/assets/cave/bouteille-11.JPG',
  'src/assets/cave/bouteille-cave-4.JPG',
  'src/assets/cave/bouteilles-cave-3.JPG',
  'src/assets/cave/evenement.JPG',
  'src/assets/dilia/1000-feuille-truffe.JPG',
  'src/assets/dilia/DILIA-2024-bar.jpg',
  'src/assets/dilia/DILIA-2024-michele-travail.jpg',
  'src/assets/dilieta/carte.JPG',
  'src/assets/dilieta/fournisseur.JPG',
  'src/assets/dilieta/traiteur-1.JPG',
  'src/assets/dilieta/vitrine-5.JPG',
];

async function optimizeImage(inputPath, quality = 80) {
  const dir = path.dirname(inputPath).replace(ASSETS_DIR, WEBP_OUTPUT_DIR);
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  // Create output directory if it doesn't exist
  await fs.mkdir(dir, { recursive: true });

  console.log(`Optimizing: ${inputPath}`);
  
  // Convert to WebP
  const webpFiles = await imagemin([inputPath], {
    destination: dir,
    plugins: [
      imageminWebp({
        quality: quality,
        method: 6, // Better compression (slower)
      })
    ]
  });

  for (const file of webpFiles) {
    const originalSize = (await fs.stat(inputPath)).size;
    const optimizedSize = file.data.length;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    
    console.log(`  → ${file.destinationPath}`);
    console.log(`    Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`    Optimized: ${(optimizedSize / 1024).toFixed(0)} KB`);
    console.log(`    Savings: ${savings}%`);
    console.log('');
  }

  return webpFiles;
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  // First, optimize critical images
  console.log('=== Optimizing Critical Images ===\n');
  for (const img of CRITICAL_IMAGES) {
    try {
      await optimizeImage(img, 75); // Lower quality for large images
    } catch (err) {
      console.error(`Error optimizing ${img}:`, err.message);
    }
  }

  // Then, optimize all other JPG images
  console.log('=== Optimizing All Images ===\n');
  const allImages = await glob(`${ASSETS_DIR}/**/*.+(jpg|JPG|jpeg)`, {
    ignore: CRITICAL_IMAGES
  });

  for (const img of allImages) {
    try {
      await optimizeImage(img, 85); // Higher quality for regular images
    } catch (err) {
      console.error(`Error optimizing ${img}:`, err.message);
    }
  }

  console.log('✅ Image optimization complete!');
  console.log(`📁 WebP images saved to: ${WEBP_OUTPUT_DIR}`);
}

main().catch(console.error);