import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const AnnouncementBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { banner } = useLanguage();

  const isVisible = useMemo(() => {
    if (!banner.enabled || isDismissed) return false;

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (banner.startDate) {
      const start = new Date(banner.startDate);
      if (now < start) return false;
    }

    if (banner.endDate) {
      const end = new Date(banner.endDate);
      end.setHours(23, 59, 59, 999);
      if (now > end) return false;
    }

    return true;
  }, [banner, isDismissed]);

  if (!isVisible) return null;

  return (
    <div className="bg-foreground text-background py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-center">
        <Link 
          to={banner.link} 
          className="text-sm tracking-wide hover:opacity-80 transition-opacity"
        >
          {banner.text}
        </Link>
        {banner.dismissible && (
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
