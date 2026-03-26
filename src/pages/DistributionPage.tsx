import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import Hero from '@/components/sections/Hero';
import ContentBlock from '@/components/sections/ContentBlock';
import SectionNav from '@/components/sections/SectionNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import muni from '@/assets/cave/bouteille cave 4.JPG';
import eben from '@/assets/cave/bouteille 11.JPG';
import rugoli from '@/assets/cave/bouteilles cave 3.JPG';

const DistributionPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Demande de contact - ${formData.company || formData.name}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\n` +
      `Entreprise: ${formData.company}\n` +
      `Email: ${formData.email}\n` +
      `Téléphone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:distribution@dilia.fr?subject=${subject}&body=${body}`;
  };

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
    { id: 'story', label: t('distribution', 'sections.story.title') },
    { id: 'team', label: t('distribution', 'sections.team.title') },
    { id: 'tasting', label: t('distribution', 'sections.tasting.title') },
    { id: 'prices', label: t('distribution', 'sections.prices.title') },
    { id: 'contact', label: t('distribution', 'sections.contact.title') },
  ];

  return (
    <Layout>
      <SEOHead page="distribution" />
      <Hero
        title={t('distribution', 'hero.title')}
        subtitle={t('distribution', 'hero.subtitle')}
      />
      <SectionNav sections={sections} />

      <ContentBlock
        id="story"
        align="left"
        title={t('distribution', 'sections.story.title')}
        subtitle={t('distribution', 'sections.story.subtitle')}
        description={t('distribution', 'sections.story.description')}
        imageSrc={muni}
        imageAlt="Distribution"
      />

      <div className="bg-muted">
        <ContentBlock
          id="team"
          align="right"
          title={t('distribution', 'sections.team.title')}
          subtitle={t('distribution', 'sections.team.subtitle')}
          description={t('distribution', 'sections.team.description')}
          imageSrc={eben}
          imageAlt="Team"
        />
      </div>

      <ContentBlock
        id="tasting"
        align="left"
        title={t('distribution', 'sections.tasting.title')}
        subtitle={t('distribution', 'sections.tasting.subtitle')}
        description={t('distribution', 'sections.tasting.description')}
        imageSrc={rugoli}
        imageAlt="Tasting"
      />

      <div className="bg-muted">
        <ContentBlock
          id="prices"
          align="right"
          title={t('distribution', 'sections.prices.title')}
          subtitle={t('distribution', 'sections.prices.subtitle')}
          description={t('distribution', 'sections.prices.description')}
          showPlaceholder={false}
        />
      </div>

      {/* Contact Form */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm tracking-widest uppercase opacity-60">
                {t('distribution', 'sections.contact.subtitle')}
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-2">
                {t('distribution', 'sections.contact.title')}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm tracking-wide opacity-70 mb-2 block">
                    {t('distribution', 'sections.contact.form.name')}
                  </label>
                  <Input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-transparent border-foreground/20 focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm tracking-wide opacity-70 mb-2 block">
                    {t('distribution', 'sections.contact.form.company')}
                  </label>
                  <Input 
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-transparent border-foreground/20 focus:border-foreground"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm tracking-wide opacity-70 mb-2 block">
                    {t('distribution', 'sections.contact.form.email')}
                  </label>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-transparent border-foreground/20 focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm tracking-wide opacity-70 mb-2 block">
                    {t('distribution', 'sections.contact.form.phone')}
                  </label>
                  <Input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-transparent border-foreground/20 focus:border-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm tracking-wide opacity-70 mb-2 block">
                  {t('distribution', 'sections.contact.form.message')}
                </label>
                <Textarea 
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-transparent border-foreground/20 focus:border-foreground resize-none"
                />
              </div>

              <Button 
                type="submit"
                className="w-full md:w-auto px-12"
              >
                {t('distribution', 'sections.contact.form.submit')}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-12 pt-12 border-t border-border text-center">
              <p className="opacity-70">{t('distribution', 'sections.contact.address')}</p>
              <p className="opacity-70 mt-2">
                <a href={`tel:${t('distribution', 'sections.contact.phone')}`} className="hover:opacity-100">
                  {t('distribution', 'sections.contact.phone')}
                </a>
                {' — '}
                <a href={`mailto:${t('distribution', 'sections.contact.email')}`} className="hover:opacity-100">
                  {t('distribution', 'sections.contact.email')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DistributionPage;
