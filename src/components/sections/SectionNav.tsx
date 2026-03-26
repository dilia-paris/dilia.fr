import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SectionNavProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
}

const SectionNav = ({ sections }: SectionNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 py-3 overflow-x-auto">
          {sections.map((section) => (
            <Link
              key={section.id}
              to={`${currentPath}#${section.id}`}
              className="px-3 py-2 text-sm tracking-wide opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SectionNav;