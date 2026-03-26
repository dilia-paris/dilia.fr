import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/sections/Hero';
import ContentBlock from '@/components/sections/ContentBlock';
import ContactSection from '@/components/sections/ContactSection';
import SectionNav from '@/components/sections/SectionNav';
import OptimizedImage from '@/components/OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';
import histoire from '@/assets/cave/histoire.JPG';
import vin from '@/assets/cave/vin.JPG';
import evenement from '@/assets/cave/evenement.JPG';
import un from '@/assets/cave/1.JPG';
import deux from '@/assets/cave/2.JPG';
import trois from '@/assets/cave/3.JPG';
import quatre from '@/assets/cave/4.JPG';
import cinq from '@/assets/cave/5.JPG';
import six from '@/assets/cave/6.JPG';

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

  const sections = [
    { id: 'story', label: t('lacave', 'sections.story.title') },
    { id: 'wines', label: t('lacave', 'sections.wines.title') },
    { id: 'events', label: t('lacave', 'sections.events.title') },
    { id: 'photos', label: t('lacave', 'sections.photos.title') },
    { id: 'contact', label: t('lacave', 'sections.contact.title') },
  ];

  return (
    <Layout>
      <SEOHead page="lacave" />
      <Hero
        title={t('lacave', 'hero.title')}
        subtitle={t('lacave', 'hero.subtitle')}
      />
      <SectionNav sections={sections} />

      <ContentBlock
        id="story"
        align="left"
        title={t('lacave', 'sections.story.title')}
        subtitle={t('lacave', 'sections.story.subtitle')}
        description={t('lacave', 'sections.story.description')}
        imageSrc={histoire}
        imageAlt="La Cave"
        socialLinks={[
          { platform: 'instagram', url: 'https://www.instagram.com/dilia_lacave/', label: 'Instagram' },
        ]}
      />

      <div className="bg-muted">
        <ContentBlock
          id="wines"
          align="right"
          title={t('lacave', 'sections.wines.title')}
          subtitle={t('lacave', 'sections.wines.subtitle')}
          description={t('lacave', 'sections.wines.description')}
          imageSrc={vin}
          imageAlt="Wines"
        />
      </div>

      <ContentBlock
        id="events"
        align="left"
        title={t('lacave', 'sections.events.title')}
        subtitle={t('lacave', 'sections.events.subtitle')}
        description={t('lacave', 'sections.events.description')}
        imageSrc={evenement}
        imageAlt="Events"
      />

      {/* Photo Gallery */}
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
              <OptimizedImage
                key={1}
                src={un}
                alt={`Gallery 1`}
                size="gallery"
                aspectRatio="1/1"
              />
              <OptimizedImage
                key={2}
                src={deux}
                alt={`Gallery 2`}
                size="gallery"
                aspectRatio="1/1"
              />
              <OptimizedImage
                key={3}
                src={trois}
                alt={`Gallery 3`}
                size="gallery"
                aspectRatio="1/1"
              />
              <OptimizedImage
                key={4}
                src={quatre}
                alt={`Gallery 4`}
                size="gallery"
                aspectRatio="1/1"
              />
              <OptimizedImage
                key={5}
                src={cinq}
                alt={`Gallery 5`}
                size="gallery"
                aspectRatio="1/1"
              />
              <OptimizedImage
                key={6}
                src={six}
                alt={`Gallery 6`}
                size="gallery"
                aspectRatio="1/1"
              />
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
        className="py-16 md:py-24"
      />
    </Layout>
  );
};

export default LaCavePage;
