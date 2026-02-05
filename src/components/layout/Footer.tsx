import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const sitemapSections = [
    {
      title: 'Dilia',
      links: [
        { label: t('dilia', 'sections.chef.title'), href: '/dilia#chef' },
        { label: t('dilia', 'sections.menu.title'), href: '/dilia#menu' },
        { label: t('dilia', 'sections.wines.title'), href: '/dilia#wines' },
        { label: t('dilia', 'sections.reservation.title'), href: '/dilia#reservation' },
      ],
    },
    {
      title: 'Dilietta',
      links: [
        { label: t('dilietta', 'sections.story.title'), href: '/dilietta#story' },
        { label: t('dilietta', 'sections.menu.title'), href: '/dilietta#menu' },
        { label: t('dilietta', 'sections.catering.title'), href: '/dilietta#catering' },
      ],
    },
    {
      title: 'La Cave',
      links: [
        { label: t('lacave', 'sections.story.title'), href: '/la-cave#story' },
        { label: t('lacave', 'sections.wines.title'), href: '/la-cave#wines' },
        { label: t('lacave', 'sections.events.title'), href: '/la-cave#events' },
      ],
    },
    {
      title: 'Distribution',
      links: [
        { label: t('distribution', 'sections.story.title'), href: '/distribution#story' },
        { label: t('distribution', 'sections.tasting.title'), href: '/distribution#tasting' },
        { label: t('distribution', 'sections.contact.title'), href: '/distribution#contact' },
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

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm opacity-70">{t('common', 'footer.address')}</p>
            <p className="text-sm opacity-70">{t('common', 'footer.phone')}</p>
          </div>

          <div className="flex space-x-6 text-sm">
            <Link to="/legal" className="opacity-70 hover:opacity-100 transition-opacity">
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
