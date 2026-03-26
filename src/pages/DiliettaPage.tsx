import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/sections/Hero';
import ContentBlock from '@/components/sections/ContentBlock';
import ContactSection from '@/components/sections/ContactSection';
import SectionNav from '@/components/sections/SectionNav';
import { useLanguage } from '@/contexts/LanguageContext';
import histoire from '@/assets/dilieta/pizza fritta.JPG';
import fournisseur from '@/assets/dilieta/fournisseur.JPG';
import menu from '@/assets/dilieta/carte.JPG';
import produit from '@/assets/dilieta/vitrine 5.JPG';
import traiteur from '@/assets/dilieta/traiteur 1.JPG';

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

  const sections = [
    { id: 'story', label: t('dilietta', 'sections.story.title') },
    { id: 'menu', label: t('dilietta', 'sections.menu.title') },
    { id: 'products', label: t('dilietta', 'sections.products.title') },
    { id: 'suppliers', label: t('dilietta', 'sections.suppliers.title') },
    { id: 'catering', label: t('dilietta', 'sections.catering.title') },
    { id: 'contact', label: t('dilietta', 'sections.contact.title') },
  ];

  return (
    <Layout>
      <SEOHead page="dilietta" />
      <Hero
        title={t('dilietta', 'hero.title')}
        subtitle={t('dilietta', 'hero.subtitle')}
      />
      <SectionNav sections={sections} />

      <ContentBlock
        id="story"
        align="left"
        title={t('dilietta', 'sections.story.title')}
        subtitle={t('dilietta', 'sections.story.subtitle')}
        description={t('dilietta', 'sections.story.description')}
        imageSrc={histoire}
        imageAlt="Dilietta"
      />

      <div className="bg-muted">
        <ContentBlock
          id="menu"
          align="right"
          title={t('dilietta', 'sections.menu.title')}
          subtitle={t('dilietta', 'sections.menu.subtitle')}
          description={t('dilietta', 'sections.menu.description')}
          imageSrc={menu}
          imageAlt="Menu"
        />
      </div>

      <ContentBlock
        id="products"
        align="left"
        title={t('dilietta', 'sections.products.title')}
        subtitle={t('dilietta', 'sections.products.subtitle')}
        description={t('dilietta', 'sections.products.description')}
        imageSrc={produit}
        imageAlt="Products"
      />

      <div className="bg-muted">
        <ContentBlock
          id="suppliers"
          align="right"
          title={t('dilietta', 'sections.suppliers.title')}
          subtitle={t('dilietta', 'sections.suppliers.subtitle')}
          description={t('dilietta', 'sections.suppliers.description')}
          imageSrc={fournisseur}
          imageAlt="Suppliers"
        />
      </div>

      <ContentBlock
        id="catering"
        align="left"
        title={t('dilietta', 'sections.catering.title')}
        subtitle={t('dilietta', 'sections.catering.subtitle')}
        description={t('dilietta', 'sections.catering.description')}
        imageSrc={traiteur}
        imageAlt="Catering"
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
