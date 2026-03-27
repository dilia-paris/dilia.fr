import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs/promises';

const ASSETS_DIR = 'src/assets';
const WEBP_OUTPUT_DIR = 'src/assets/webp';

// Target widths for responsive images
const RESPONSIVE_WIDTHS = [400, 800, 1200];

// Images with their target max width (based on OptimizedImage component sizes)
const IMAGE_CONFIG = {
  // Hero images (1920px max in component)
  'dilia/DILIA-2024-michele.jpg': { maxWidth: 1920, quality: 75 },
  'dilia/DILIA-2024-bar.jpg': { maxWidth: 1920, quality: 75 },
  'dilia/DILIA-2024-michele-travail.jpg': { maxWidth: 1920, quality: 75 },
  
  // Content images (800px max in component) - default
  'cave/vin.JPG': { maxWidth: 800, quality: 80 },
  'cave/histoire.JPG': { maxWidth: 800, quality: 80 },
  'dilieta/pizza-fritta.JPG': { maxWidth: 800, quality: 80 },
};

// Default config for images not explicitly listed
const DEFAULT_CONFIG = { maxWidth: 800, quality: 80 };

async function optimizeImageWithResize(inputPath, config) {
  const { maxWidth, quality } = config;
  const dir = path.dirname(inputPath).replace(ASSETS_DIR, WEBP_OUTPUT_DIR);
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  // Create output directory if it doesn't exist
  await fs.mkdir(dir, { recursive: true });

  console.log(`Optimizing: ${inputPath}`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  // If image is already smaller than maxWidth, just convert to WebP
  if (metadata.width <= maxWidth) {
    const outputPath = path.join(dir, `${filename}.webp`);
    await image
      .webp({ quality, effort: 6 })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    console.log(`  → ${outputPath}`);
    console.log(`    Size: ${(stats.size / 1024).toFixed(0)} KB (width: ${metadata.width}px)`);
    console.log('');
    return;
  }

  // Resize to maxWidth and convert to WebP
  const mainOutputPath = path.join(dir, `${filename}.webp`);
  await sharp(inputPath)
    .resize(maxWidth, null, { withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(mainOutputPath);
  
  const mainStats = await fs.stat(mainOutputPath);
  console.log(`  → ${mainOutputPath}`);
  console.log(`    Size: ${(mainStats.size / 1024).toFixed(0)} KB (width: ${maxWidth}px)`);

  // Generate responsive variants
  for (const width of RESPONSIVE_WIDTHS) {
    if (width >= metadata.width || width >= maxWidth) continue;
    
    const variantPath = path.join(dir, `${filename}-${width}.webp`);
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: quality - 5, effort: 6 })
      .toFile(variantPath);
    
    const variantStats = await fs.stat(variantPath);
    console.log(`    + ${width}w: ${(variantStats.size / 1024).toFixed(0)} KB`);
  }
  
  console.log('');
}

async function main() {
  console.log('🖼️  Starting image optimization with resizing...\n');
  
  // Optimize all JPG images
  const allImages = await glob(`${ASSETS_DIR}/**/*.+(jpg|JPG|jpeg)`);

  for (const img of allImages) {
    try {
      const relativePath = path.relative(ASSETS_DIR, img);
      const config = IMAGE_CONFIG[relativePath] || DEFAULT_CONFIG;
      await optimizeImageWithResize(img, config);
    } catch (err) {
      console.error(`Error optimizing ${img}:`, err.message);
    }
  }

  console.log('✅ Image optimization complete!');
  console.log(`📁 WebP images saved to: ${WEBP_OUTPUT_DIR}`);
}

main().catch(console.error);
