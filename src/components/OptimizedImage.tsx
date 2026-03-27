import { useState, useMemo, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ImageSize = 'hero' | 'content' | 'gallery' | 'og';

const SIZE_CONFIG: Record<ImageSize, { width: number; height: number; sizes: string }> = {
  hero: { width: 1920, height: 1080, sizes: '100vw' },
  content: { width: 800, height: 600, sizes: '(min-width: 768px) 50vw, 100vw' },
  gallery: { width: 600, height: 600, sizes: '(min-width: 768px) 33vw, 50vw' },
  og: { width: 1200, height: 630, sizes: '100vw' },
};

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'sizes'> {
  src: string;
  alt: string;
  size?: ImageSize;
  srcSet?: string;
  sizes?: string;
  aspectRatio?: string;
  placeholderText?: string;
  priority?: boolean;
}

/**
 * Generate srcset from base image path
 * Expects images to be named like: image.webp, image-400.webp, image-800.webp, image-1200.webp
 */
function generateSrcSet(src: string): string | undefined {
  // Only generate srcset for webp images in assets
  if (!src.includes('/assets/webp/') || !src.endsWith('.webp')) {
    return undefined;
  }

  const basePath = src.replace('.webp', '');
  // Only include variants that actually exist (400px variants)
  const widths = [400];
  
  const srcSetParts = widths.map(width => `${basePath}-${width}.webp ${width}w`);
  
  return srcSetParts.join(', ');
}

const OptimizedImage = ({
  src,
  alt,
  size = 'content',
  srcSet,
  sizes,
  aspectRatio,
  placeholderText = 'Photo',
  priority = false,
  className,
  ...props
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const config = SIZE_CONFIG[size];

  // Auto-generate srcset if not provided
  const finalSrcSet = useMemo(() => {
    if (srcSet) return srcSet;
    return generateSrcSet(src);
  }, [src, srcSet]);

  if (error || !src) {
    return (
      <div
        className={cn(
          'bg-muted border border-border flex items-center justify-center',
          className
        )}
        style={aspectRatio === 'auto' ? {} : { aspectRatio: aspectRatio ?? `${config.width}/${config.height}` }}
      >
        <span className="text-sm tracking-widest uppercase opacity-30">
          {placeholderText}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn('relative overflow-hidden bg-muted', className)}
      style={aspectRatio === 'auto' ? {} : { aspectRatio: aspectRatio ?? `${config.width}/${config.height}` }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      <img
        src={src}
        alt={alt}
        width={config.width}
        height={config.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        srcSet={finalSrcSet}
        sizes={sizes ?? config.sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
