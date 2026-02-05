import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface Hours {
  title: string;
  [key: string]: string;
}

interface ContactSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  hours: Hours;
}

const ContactSection = ({
  id,
  title,
  subtitle,
  address,
  phone,
  email,
  hours,
}: ContactSectionProps) => {
  const hourEntries = Object.entries(hours).filter(([key]) => key !== 'title');

  return (
    <section id={id} className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm tracking-widest uppercase opacity-60">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-2">
              {title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 mt-0.5 opacity-60" />
                <p className="opacity-80">{address}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 opacity-60" />
                <a href={`tel:${phone}`} className="opacity-80 hover:opacity-100 transition-opacity">
                  {phone}
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 opacity-60" />
                <a href={`mailto:${email}`} className="opacity-80 hover:opacity-100 transition-opacity">
                  {email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Clock className="h-5 w-5 opacity-60" />
                <span className="font-medium">{hours.title}</span>
              </div>
              <div className="space-y-2 pl-9">
                {hourEntries.map(([key, value]) => (
                  <p key={key} className="text-sm opacity-80">
                    {value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-12 aspect-[16/9] md:aspect-[21/9] bg-background border border-border flex items-center justify-center">
            <span className="text-sm tracking-widest uppercase opacity-30">
              Carte
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
