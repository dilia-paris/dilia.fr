import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import OptimizedImage from '@/components/OptimizedImage';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { label: t('common', 'nav.dilia'), href: `/${language}/dilia` },
    { label: t('common', 'nav.dilietta'), href: `/${language}/dilietta` },
    { label: t('common', 'nav.lacave'), href: `/${language}/la-cave` },
    { label: t('common', 'nav.distribution'), href: `/${language}/distribution` },
    { label: t('common', 'nav.reservation'), href: `/${language}/dilia#reservation` },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ];

  const isActive = (href: string) => {
    if (href.includes('#')) {
      return location.pathname === href.split('#')[0];
    }
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={`/${language}`} className="hover:opacity-70 transition-opacity">
            <OptimizedImage
              src="/d.png"
              alt="Dilia logo"
              size="content"
              aspectRatio="1/1"
              className="h-8 w-8 md:h-10 md:w-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm tracking-wide transition-opacity hover:opacity-70",
                  isActive(item.href) && "font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm tracking-wide hover:opacity-70 transition-opacity">
                <span>{language.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[80px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      language === lang.code && "font-medium"
                    )}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden" aria-label="Toggle navigation menu">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg tracking-wide transition-opacity hover:opacity-70",
                      isActive(item.href) && "font-medium"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-6 border-t border-border">
                  <div className="flex space-x-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={cn(
                          "text-sm tracking-wide transition-opacity hover:opacity-70",
                          language === lang.code && "font-medium underline"
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;
