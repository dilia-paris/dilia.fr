import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import ContentBlock from '@/components/sections/ContentBlock';
import ContactSection from '@/components/sections/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';

const LaCavePage = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout>
      <Hero
        title={t('lacave', 'hero.title')}
        subtitle={t('lacave', 'hero.subtitle')}
      />

      <ContentBlock
        id="story"
        align="left"
        title={t('lacave', 'sections.story.title')}
        subtitle={t('lacave', 'sections.story.subtitle')}
        description={t('lacave', 'sections.story.description')}
      />

      <div className="bg-muted">
        <ContentBlock
          id="wines"
          align="right"
          title={t('lacave', 'sections.wines.title')}
          subtitle={t('lacave', 'sections.wines.subtitle')}
          description={t('lacave', 'sections.wines.description')}
        />
      </div>

      <ContentBlock
        id="events"
        align="left"
        title={t('lacave', 'sections.events.title')}
        subtitle={t('lacave', 'sections.events.subtitle')}
        description={t('lacave', 'sections.events.description')}
      />

      {/* Photo Gallery Placeholder */}
      <section id="photos" className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm tracking-widest uppercase opacity-60">
              {t('lacave', 'sections.photos.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-2">
              {t('lacave', 'sections.photos.title')}
            </h2>
            <p className="text-base md:text-lg leading-relaxed opacity-80 mt-4 max-w-2xl mx-auto">
              {t('lacave', 'sections.photos.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="aspect-square bg-background border border-border flex items-center justify-center"
              >
                <span className="text-sm tracking-widest uppercase opacity-30">
                  Photo {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection
        id="contact"
        title={t('lacave', 'sections.contact.title')}
        subtitle={t('lacave', 'sections.contact.subtitle')}
        address={t('lacave', 'sections.contact.address')}
        phone={t('lacave', 'sections.contact.phone')}
        email={t('lacave', 'sections.contact.email')}
        hours={{
          title: t('lacave', 'sections.contact.hours.title'),
          weekdays: t('lacave', 'sections.contact.hours.weekdays'),
          closed: t('lacave', 'sections.contact.hours.closed'),
        }}
      />
    </Layout>
  );
};

export default LaCavePage;
