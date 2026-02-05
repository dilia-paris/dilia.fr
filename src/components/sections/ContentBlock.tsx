import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentBlockProps {
  align?: 'left' | 'right';
  title: string;
  subtitle?: string;
  description: string;
  tagline?: string;
  children?: ReactNode;
  id?: string;
  showPlaceholder?: boolean;
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
            <p className="text-base md:text-lg leading-relaxed opacity-80">
              {description}
            </p>
            {tagline && (
              <p className="text-sm italic tracking-wide opacity-60">
                {tagline}
              </p>
            )}
            {children}
          </div>

          {/* Image Placeholder */}
          {showPlaceholder && (
            <div
              className={cn(
                "aspect-[4/3] bg-muted border border-border flex items-center justify-center",
                !isLeft && "md:order-1"
              )}
            >
              <span className="text-sm tracking-widest uppercase opacity-30">
                Photo
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;
