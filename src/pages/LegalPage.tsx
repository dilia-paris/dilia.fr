import Layout from '@/components/layout/Layout';
import SEOHead from '@/components/SEOHead';
import { useLanguage } from '@/contexts/LanguageContext';

const LegalPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <SEOHead page="legal" />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-8">
              {t('common', 'footer.legal')}
            </h1>

            <div className="space-y-6 text-base leading-relaxed opacity-80">
              <div>
                <h2 className="text-xl font-medium mb-3">Éditeur du site</h2>
                <p>
                  Dilia<br />
                  {t('common', 'footer.address')}<br />
                  Téléphone : {t('common', 'footer.phone')}<br />
                  Email : contact@dilia.fr
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-3">Hébergement</h2>
                <p>
                  Ce site est hébergé par :<br />
                  GitHub, Inc.<br />
                  88 Colin P Kelly Jr St<br />
                  San Francisco, CA 94107<br />
                  États-Unis
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-3">Protection des données personnelles</h2>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD), 
                  vous disposez d'un droit d'accès, de rectification, de suppression et de 
                  portabilité de vos données personnelles. Pour exercer ces droits, 
                  contactez-nous à l'adresse : contact@dilia.fr
                </p>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-3">Droit applicable</h2>
                <p>
                  Les présentes mentions légales sont soumises au droit français. 
                  En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalPage;