import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const HomePage = () => {
  const { t } = useLanguage();

  const sections = [
    { key: 'dilia', href: '/dilia', align: 'left' as const },
    { key: 'dilietta', href: '/dilietta', align: 'right' as const },
    { key: 'lacave', href: '/la-cave', align: 'left' as const },
    { key: 'distribution', href: '/distribution', align: 'right' as const },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32 lg:py-40 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4">
            {t('home', 'hero.title')}
          </h1>
          <p className="text-lg md:text-xl tracking-wide opacity-70">
            {t('home', 'hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Section CTAs */}
      {sections.map((section, index) => {
        const isLeft = section.align === 'left';
        
        return (
          <section 
            key={section.key} 
            className={cn(
              "py-16 md:py-24",
              index % 2 === 1 && "bg-muted"
            )}
          >
            <div className="container mx-auto px-4">
              <div
                className={cn(
                  "grid md:grid-cols-2 gap-8 md:gap-16 items-center"
                )}
              >
                {/* Content */}
                <div className={cn("space-y-6", !isLeft && "md:order-2")}>
                  <span className="text-sm tracking-widest uppercase opacity-60">
                    {t('home', `sections.${section.key}.subtitle`)}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
                    {t('home', `sections.${section.key}.title`)}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed opacity-80">
                    {t('home', `sections.${section.key}.description`)}
                  </p>
                  <p className="text-sm italic tracking-wide opacity-60">
                    {t('home', `sections.${section.key}.tagline`)}
                  </p>
                  <Link
                    to={section.href}
                    className="inline-flex items-center space-x-2 text-sm tracking-wide group hover:opacity-70 transition-opacity"
                  >
                    <span>{t('common', 'buttons.discover')}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Image Placeholder */}
                <div
                  className={cn(
                    "aspect-[4/3] bg-background border border-border flex items-center justify-center",
                    !isLeft && "md:order-1",
                    index % 2 === 1 && "bg-background"
                  )}
                >
                  <span className="text-sm tracking-widest uppercase opacity-30">
                    Photo
                  </span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </Layout>
  );
};

export default HomePage;
