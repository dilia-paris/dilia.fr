import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/OptimizedImage';
import { Instagram, Facebook } from 'lucide-react';

interface SocialLink {
  platform: 'instagram' | 'facebook';
  url: string;
  label?: string;
}

interface ContentBlockProps {
  align?: 'left' | 'right';
  title: string;
  subtitle?: string;
  description: string;
  tagline?: string;
  children?: ReactNode;
  id?: string;
  showPlaceholder?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  socialLinks?: SocialLink[];
  imagePriority?: boolean;
}

const ContentBlock = ({
  align = 'left',
  title,
  subtitle,
  description,
  tagline,
  children,
  id,
  showPlaceholder = true,
  imageSrc,
  imageAlt = 'Photo',
  socialLinks,
  imagePriority = false,
}: ContentBlockProps) => {
  const isLeft = align === 'left';

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "grid md:grid-cols-2 gap-8 md:gap-16 items-center",
            !isLeft && "md:flex-row-reverse"
          )}
        >
          {/* Content */}
          <div className={cn("space-y-6", !isLeft && "md:order-2")}>
            {subtitle && (
              <span className="text-sm tracking-widest uppercase opacity-60">
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
              {title}
            </h2>
            {description.includes('<') ? (
  <div className="text-base md:text-lg leading-relaxed opacity-80 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: description.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/&#039;/g, "'") }} />
) : (
  <p className="text-base md:text-lg leading-relaxed opacity-80 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: description }} />
)}
            {tagline && (
              <p className="text-sm italic tracking-wide opacity-60">
                {tagline}
              </p>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 border border-foreground/20 rounded-full text-sm hover:bg-foreground/5 transition-colors"
                  >
                    {link.platform === 'instagram' ? (
                      <Instagram className="h-4 w-4" />
                    ) : (
                      <Facebook className="h-4 w-4" />
                    )}
                    <span>{link.label || 'Follow us'}</span>
                  </a>
                ))}
              </div>
            )}
            {children}
          </div>

          {/* Image */}
          {showPlaceholder && (
            <div className={cn("max-w-md mx-auto", !isLeft && "md:order-1")}>
              <OptimizedImage
                src={imageSrc || ''}
                alt={imageAlt}
                size="content"
                aspectRatio="4/3"
                placeholderText="Photo"
                priority={imagePriority}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;
