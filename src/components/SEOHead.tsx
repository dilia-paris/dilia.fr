import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import seoConfig from '@/content/seo.json';

type PageKey = keyof typeof seoConfig.pages;

interface SEOHeadProps {
  page: PageKey;
}

const SEOHead = ({ page }: SEOHeadProps) => {
  const { language } = useLanguage();
  
  const pageData = seoConfig.pages[page]?.[language];
  const siteName = seoConfig.siteName[language];
  
  useEffect(() => {
    if (!pageData) return;

    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${pageData.url}`;
    const imageUrl = pageData.image?.startsWith('http') 
      ? pageData.image 
      : `${baseUrl}${pageData.image || seoConfig.defaultImage}`;

    // Update document title
    document.title = pageData.title;

    // Helper to update or create meta tag
    const setMeta = (attribute: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('name', 'description', pageData.description);

    // Open Graph tags
    setMeta('property', 'og:locale', language === 'fr' ? 'fr_FR' : 'en_US');
    setMeta('property', 'og:type', pageData.type || 'website');
    setMeta('property', 'og:title', pageData.title);
    setMeta('property', 'og:description', pageData.description);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:site_name', siteName);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:width', String(seoConfig.defaultImageWidth));
    setMeta('property', 'og:image:height', String(seoConfig.defaultImageHeight));
    setMeta('property', 'og:image:type', seoConfig.defaultImageType);
    
    if (seoConfig.facebookPage) {
      setMeta('property', 'article:publisher', seoConfig.facebookPage);
    }

    // Twitter Card tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageData.title);
    setMeta('name', 'twitter:description', pageData.description);
    setMeta('name', 'twitter:image', imageUrl);
    if (seoConfig.twitterHandle) {
      setMeta('name', 'twitter:site', seoConfig.twitterHandle);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // JSON-LD Schema
    const schemaType = (pageData as Record<string, unknown>).schemaType as string | undefined;
    if (schemaType) {
      // Remove existing schema
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      const schema = generateSchema(page, pageData, schemaType, baseUrl, imageUrl, language);
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [page, pageData, language, siteName]);

  return null;
};

function generateSchema(
  page: PageKey,
  pageData: Record<string, unknown>,
  schemaType: string,
  baseUrl: string,
  imageUrl: string,
  language: string
) {
  const org = seoConfig.organization;
  
  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}${pageData.url}`,
        "url": `${baseUrl}${pageData.url}`,
        "name": pageData.title,
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "primaryImageOfPage": { "@id": `${baseUrl}${pageData.url}#primaryimage` },
        "image": { "@id": `${baseUrl}${pageData.url}#primaryimage` },
        "thumbnailUrl": imageUrl,
        "description": pageData.description,
        "inLanguage": language === 'fr' ? 'fr-FR' : 'en-US',
        "potentialAction": [{
          "@type": "ReadAction",
          "target": [`${baseUrl}${pageData.url}`]
        }]
      },
      {
        "@type": "ImageObject",
        "inLanguage": language === 'fr' ? 'fr-FR' : 'en-US',
        "@id": `${baseUrl}${pageData.url}#primaryimage`,
        "url": imageUrl,
        "contentUrl": imageUrl,
        "width": seoConfig.defaultImageWidth,
        "height": seoConfig.defaultImageHeight
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": seoConfig.siteName[language as 'fr' | 'en'],
        "publisher": { "@id": `${baseUrl}/#organization` },
        "inLanguage": language === 'fr' ? 'fr-FR' : 'en-US'
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": org.name,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#/schema/logo/image/`,
          "url": `${baseUrl}${org.logo}`,
          "contentUrl": `${baseUrl}${org.logo}`
        },
        "sameAs": org.sameAs
      }
    ]
  };

  // Add specific schema based on type
  if (schemaType === 'Restaurant') {
    (baseSchema["@graph"] as unknown[]).push({
      "@type": "Restaurant",
      "@id": `${baseUrl}${pageData.url}#restaurant`,
      "name": org.name,
      "image": imageUrl,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": org.address,
        "addressLocality": "Paris",
        "postalCode": "75011",
        "addressCountry": "FR"
      },
      "telephone": org.telephone,
      "priceRange": pageData.priceRange,
      "servesCuisine": pageData.servesCuisine,
      "openingHoursSpecification": (pageData.openingHours as string[] || []).map(hours => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hours.split(' ')[0],
        "opens": hours.split(' ')[1]?.split('-')[0],
        "closes": hours.split(' ')[1]?.split('-')[1]
      }))
    });
  }

  return baseSchema;
}

export default SEOHead;
