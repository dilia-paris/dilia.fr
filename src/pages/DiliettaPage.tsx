import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/sections/Hero';
import ContentBlock from '@/components/sections/ContentBlock';
import ContactSection from '@/components/sections/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';

const DiliettaPage = () => {
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
      <SEOHead page="dilietta" />
      <Hero
        title={t('dilietta', 'hero.title')}
        subtitle={t('dilietta', 'hero.subtitle')}
      />

      <ContentBlock
        id="story"
        align="left"
        title={t('dilietta', 'sections.story.title')}
        subtitle={t('dilietta', 'sections.story.subtitle')}
        description={t('dilietta', 'sections.story.description')}
      />

      <div className="bg-muted">
        <ContentBlock
          id="menu"
          align="right"
          title={t('dilietta', 'sections.menu.title')}
          subtitle={t('dilietta', 'sections.menu.subtitle')}
          description={t('dilietta', 'sections.menu.description')}
        />
      </div>

      <ContentBlock
        id="products"
        align="left"
        title={t('dilietta', 'sections.products.title')}
        subtitle={t('dilietta', 'sections.products.subtitle')}
        description={t('dilietta', 'sections.products.description')}
      />

      <div className="bg-muted">
        <ContentBlock
          id="suppliers"
          align="right"
          title={t('dilietta', 'sections.suppliers.title')}
          subtitle={t('dilietta', 'sections.suppliers.subtitle')}
          description={t('dilietta', 'sections.suppliers.description')}
        />
      </div>

      <ContentBlock
        id="catering"
        align="left"
        title={t('dilietta', 'sections.catering.title')}
        subtitle={t('dilietta', 'sections.catering.subtitle')}
        description={t('dilietta', 'sections.catering.description')}
      />

      <ContactSection
        id="contact"
        title={t('dilietta', 'sections.contact.title')}
        subtitle={t('dilietta', 'sections.contact.subtitle')}
        address={t('dilietta', 'sections.contact.address')}
        phone={t('dilietta', 'sections.contact.phone')}
        email={t('dilietta', 'sections.contact.email')}
        hours={{
          title: t('dilietta', 'sections.contact.hours.title'),
          weekdays: t('dilietta', 'sections.contact.hours.weekdays'),
          saturday: t('dilietta', 'sections.contact.hours.saturday'),
          closed: t('dilietta', 'sections.contact.hours.closed'),
        }}
      />
    </Layout>
  );
};

export default DiliettaPage;
