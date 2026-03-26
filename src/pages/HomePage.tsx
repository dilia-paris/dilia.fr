import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import OptimizedImage from '@/components/OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import dilia from '@/assets/dilia/DILIA 2024 michele.jpg';
import dilietta from '@/assets/dilieta/pizza fritta.JPG';
import cave from '@/assets/cave/histoire.JPG';
import distribution from '@/assets/cave/vin.JPG';

const HomePage = () => {
  const { t } = useLanguage();

  const sections = [
    { key: 'dilia', href: '/dilia', align: 'left' as const, image: dilia },
    { key: 'dilietta', href: '/dilietta', align: 'right' as const, image: dilietta },
    { key: 'lacave', href: '/la-cave', align: 'left' as const, image: cave },
    { key: 'distribution', href: '/distribution', align: 'right' as const, image: distribution },
  ];

  return (
    <Layout>
      <SEOHead page="home" />
      {/* Hero */}
      <section className="py-10 md:py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-3">
            {t('home', 'hero.title')}
          </h1>
          <p className="text-base md:text-lg tracking-wide opacity-70">
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
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
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

                {/* Image */}
                <div className={cn(!isLeft && "md:order-1")}>
                  <OptimizedImage
                    src={section.image}
                    alt={t('home', `sections.${section.key}.title`)}
                    size="content"
                    aspectRatio="4/3"
                  />
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
