import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/sections/Hero';
import ContentBlock from '@/components/sections/ContentBlock';
import ContactSection from '@/components/sections/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';

const DiliaPage = () => {
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
      <SEOHead page="dilia" />
      <Hero
        title={t('dilia', 'hero.title')}
        subtitle={t('dilia', 'hero.subtitle')}
      />

      <ContentBlock
        id="chef"
        align="left"
        title={t('dilia', 'sections.chef.title')}
        subtitle={t('dilia', 'sections.chef.subtitle')}
        description={t('dilia', 'sections.chef.description')}
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
        />
      </div>

      <ContentBlock
        id="wines"
        align="left"
        title={t('dilia', 'sections.wines.title')}
        subtitle={t('dilia', 'sections.wines.subtitle')}
        description={t('dilia', 'sections.wines.description')}
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
            <p className="text-base md:text-lg leading-relaxed opacity-80 mb-8">
              {t('dilia', 'sections.reservation.description')}
            </p>
            
            {/* TheFork iframe placeholder */}
            <div className="aspect-[4/3] md:aspect-[16/9] bg-background border border-border flex items-center justify-center">
              <span className="text-sm tracking-widest uppercase opacity-30">
                TheFork Widget
              </span>
            </div>
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
      />
    </Layout>
  );
};

export default DiliaPage;
