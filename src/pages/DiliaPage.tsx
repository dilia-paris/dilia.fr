import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/sections/Hero';
import ContentBlock from '@/components/sections/ContentBlock';
import ContactSection from '@/components/sections/ContactSection';
import SectionNav from '@/components/sections/SectionNav';
import { useLanguage } from '@/contexts/LanguageContext';
import michele from '@/assets/webp/dilia/DILIA-2024-michele-travail-400.webp';
import menu from '@/assets/webp/dilia/1000-feuille-truffe-400.webp';
import vin from '@/assets/webp/dilia/DILIA-2024-bar-400.webp';

const DiliaPage = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // Load Zenchef SDK script
    const existingScript = document.getElementById('zenchef-sdk');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'zenchef-sdk';
      script.src = 'https://sdk.zenchef.com/v1/sdk.min.js';
      document.head.appendChild(script);
    }
  }, []);

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
    { id: 'chef', label: t('dilia', 'sections.chef.title') },
    { id: 'menu', label: t('dilia', 'sections.menu.title') },
    { id: 'wines', label: t('dilia', 'sections.wines.title') },
    { id: 'reservation', label: t('dilia', 'sections.reservation.title') },
    { id: 'contact', label: t('dilia', 'sections.contact.title') },
  ];

  return (
    <Layout>
      <SEOHead page="dilia" />
      <Hero
        title={t('dilia', 'hero.title')}
        subtitle={t('dilia', 'hero.subtitle')}
      />
      <SectionNav sections={sections} />

      <ContentBlock
        id="chef"
        align="left"
        title={t('dilia', 'sections.chef.title')}
        subtitle={t('dilia', 'sections.chef.subtitle')}
        description={t('dilia', 'sections.chef.description')}
        imageSrc={michele}
        imageAlt="Chef"
        socialLinks={[
          { platform: 'instagram', url: 'https://www.instagram.com/dilia_restaurant/', label: 'Instagram' },
        ]}
      >
        <blockquote className="border-l-2 border-foreground/20 pl-4 italic opacity-70">
          "{t('dilia', 'sections.chef.quote')}"
        </blockquote>
      </ContentBlock>

      <div className="bg-muted">
        <ContentBlock
          id="menu"
          align="right"
          title={t('dilia', 'sections.menu.title')}
          subtitle={t('dilia', 'sections.menu.subtitle')}
          description={t('dilia', 'sections.menu.description')}
          imageSrc={menu}
          imageAlt="Menu"
        >
          <a
            href="/menu-dilia.pdf"
            download
            className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-2.5 text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
          >
            {t('common', 'buttons.downloadMenu')}
          </a>
        </ContentBlock>
      </div>

      <ContentBlock
        id="wines"
        align="left"
        title={t('dilia', 'sections.wines.title')}
        subtitle={t('dilia', 'sections.wines.subtitle')}
        description={t('dilia', 'sections.wines.description')}
        imageSrc={vin}
        imageAlt="Wines"
      />


      <ContentBlock
        id="wines"
        align="right"
        title={t('dilia', 'sections.wines.title')}
        subtitle={t('dilia', 'sections.wines.subtitle')}
        description={t('dilia', 'sections.wines.description')}
        imageSrc={vin}
        imageAlt="Wines"
      />


      <ContentBlock
        id="wines"
        align="left"
        title={t('dilia', 'sections.wines.title')}
        subtitle={t('dilia', 'sections.wines.subtitle')}
        description={t('dilia', 'sections.wines.description')}
        imageSrc={vin}
        imageAlt="Wines"
      />

      {/* Reservation Section with iframe placeholder */}
      <section id="reservation" className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm tracking-widest uppercase opacity-60">
              {t('dilia', 'sections.reservation.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-2 mb-6">
              {t('dilia', 'sections.reservation.title')}
            </h2>
            <p className="text-base md:text-lg leading-relaxed opacity-80 mb-8 whitespace-pre-line">
              {t('dilia', 'sections.reservation.description').replace(/\\n/g, '\n')}
            </p>
            
            {/* Zenchef Reservation Widget */}
            <iframe
              src="https://bookings.zenchef.com/results?rid=353401&fullscreen=1"
              scrolling="yes"
              width="100%"
              height="1900"
              style={{
                display: 'block',
                margin: '0 auto',
                maxWidth: '600px',
                border: '1em solid black'
              }}
            />
          </div>
        </div>
      </section>

      <ContactSection
        id="contact"
        title={t('dilia', 'sections.contact.title')}
        subtitle={t('dilia', 'sections.contact.subtitle')}
        address={t('dilia', 'sections.contact.address')}
        phone={t('dilia', 'sections.contact.phone')}
        email={t('dilia', 'sections.contact.email')}
        hours={{
          title: t('dilia', 'sections.contact.hours.title'),
          lunch: t('dilia', 'sections.contact.hours.lunch'),
          dinner: t('dilia', 'sections.contact.hours.dinner'),
          closed: t('dilia', 'sections.contact.hours.closed'),
        }}
        className="py-16 md:py-24"
      />
    </Layout>
  );
};

export default DiliaPage;
