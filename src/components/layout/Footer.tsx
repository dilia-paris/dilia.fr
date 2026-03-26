import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();

  const sitemapSections = [
    {
      title: 'Dilia',
      links: [
        { label: t('dilia', 'sections.chef.title'), href: `/${language}/dilia#chef` },
        { label: t('dilia', 'sections.menu.title'), href: `/${language}/dilia#menu` },
        { label: t('dilia', 'sections.wines.title'), href: `/${language}/dilia#wines` },
        { label: t('dilia', 'sections.reservation.title'), href: `/${language}/dilia#reservation` },
      ],
    },
    {
      title: 'Dilietta',
      links: [
        { label: t('dilietta', 'sections.story.title'), href: `/${language}/dilietta#story` },
        { label: t('dilietta', 'sections.menu.title'), href: `/${language}/dilietta#menu` },
        { label: t('dilietta', 'sections.catering.title'), href: `/${language}/dilietta#catering` },
      ],
    },
    {
      title: 'La Cave',
      links: [
        { label: t('lacave', 'sections.story.title'), href: `/${language}/la-cave#story` },
        { label: t('lacave', 'sections.wines.title'), href: `/${language}/la-cave#wines` },
        { label: t('lacave', 'sections.events.title'), href: `/${language}/la-cave#events` },
      ],
    },
    {
      title: 'Distribution',
      links: [
        { label: t('distribution', 'sections.story.title'), href: `/${language}/distribution#story` },
        { label: t('distribution', 'sections.tasting.title'), href: `/${language}/distribution#tasting` },
        { label: t('distribution', 'sections.contact.title'), href: `/${language}/distribution#contact` },
      ],
    },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        {/* Sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {sitemapSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium tracking-wide mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8" />

        {/* Social Media */}
        <div className="mb-8">
          <h3 className="font-medium tracking-wide mb-4">Suivez-nous</h3>
          <div className="flex flex-wrap gap-6">
            <a
              href="https://www.instagram.com/dilia_restaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Instagram className="h-4 w-4" />
              <span>Dilia</span>
            </a>
            <a
              href="https://www.instagram.com/dilietta_paris/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Instagram className="h-4 w-4" />
              <span>Dilietta</span>
            </a>
            <a
              href="https://www.instagram.com/dilia_lacave/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Instagram className="h-4 w-4" />
              <span>La Cave</span>
            </a>
            <a
              href="https://www.facebook.com/dilia.paris"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm opacity-70">{t('common', 'footer.address')}</p>
            <p className="text-sm opacity-70">{t('common', 'footer.phone')}</p>
          </div>

          <div className="flex space-x-6 text-sm">
            <Link to={`/${language}/legal`} className="opacity-70 hover:opacity-100 transition-opacity">
              {t('common', 'footer.legal')}
            </Link>
          </div>

          <p className="text-sm opacity-70">{t('common', 'footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
