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
    
    // Robots meta tag
    if (seoConfig.robots) {
      setMeta('name', 'robots', seoConfig.robots);
    }

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
    setMeta('property', 'og:image:alt', pageData.title);
    
    if (seoConfig.facebookPage) {
      setMeta('property', 'article:publisher', seoConfig.facebookPage);
    }
    
    // Article modified time
    const modifiedTime = (pageData as Record<string, unknown>).modifiedTime as string | undefined;
    if (modifiedTime) {
      setMeta('property', 'article:modified_time', modifiedTime);
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

    // Hreflang tags for multilingual support
    const setHreflang = (lang: string, href: string) => {
      let element = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'alternate');
        element.setAttribute('hreflang', lang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };
    
    // Set hreflang for current page in both languages
    // Extract the path without language prefix to build alternate URLs
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(fr|en)/, '');
    const frPath = `/fr${pathWithoutLang}`;
    const enPath = `/en${pathWithoutLang}`;
    
    setHreflang('fr', `${baseUrl}${frPath}`);
    setHreflang('en', `${baseUrl}${enPath}`);
    setHreflang('x-default', `${baseUrl}${frPath}`);

    // JSON-LD Schema
    const schemaType = (pageData as Record<string, unknown>).schemaType as string | undefined;
    // Remove existing schemas
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(s => s.remove());
    
    if (schemaType) {
      const schema = generateSchema(page, pageData, schemaType, baseUrl, imageUrl, language);
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    
    // Add BreadcrumbList schema for all pages except home
    if (page !== 'home') {
      const breadcrumbSchema = generateBreadcrumbSchema(page, pageData, baseUrl, language);
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(breadcrumbScript);
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
  const address = {
    "@type": "PostalAddress",
    "streetAddress": org.address,
    "addressLocality": "Paris",
    "postalCode": "75011",
    "addressCountry": "FR"
  };

  const geo = (pageData as Record<string, unknown>).geo as { latitude: number; longitude: number } | undefined;
  
  const baseLocalBusiness = {
    "@id": `${baseUrl}${pageData.url}#business`,
    "name": org.name,
    "image": imageUrl,
    "address": address,
    "telephone": org.telephone,
    "url": `${baseUrl}${pageData.url}`,
    "geo": geo ? {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    } : undefined
  };

  if (schemaType === 'Restaurant') {
    (baseSchema["@graph"] as unknown[]).push({
      "@type": "Restaurant",
      ...baseLocalBusiness,
      "priceRange": pageData.priceRange,
      "servesCuisine": pageData.servesCuisine,
      "openingHoursSpecification": (pageData.openingHours as string[] || []).map(hours => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": hours.split(' ')[0],
        "opens": hours.split(' ')[1]?.split('-')[0],
        "closes": hours.split(' ')[1]?.split('-')[1]
      }))
    });
  } else if (schemaType === 'GroceryStore') {
    (baseSchema["@graph"] as unknown[]).push({
      "@type": "GroceryStore",
      ...baseLocalBusiness,
      "priceRange": pageData.priceRange,
      "servesCuisine": pageData.servesCuisine
    });
  } else if (schemaType === 'WineBar') {
    (baseSchema["@graph"] as unknown[]).push({
      "@type": "WineBar",
      ...baseLocalBusiness
    });
  } else if (schemaType === 'LocalBusiness') {
    (baseSchema["@graph"] as unknown[]).push({
      "@type": "LocalBusiness",
      ...baseLocalBusiness
    });
  }

  return baseSchema;
}

function generateBreadcrumbSchema(
  page: PageKey,
  pageData: Record<string, unknown>,
  baseUrl: string,
  language: string
) {
  const langPrefix = language === 'fr' ? '/fr' : '/en';
  
  // Define breadcrumb items based on page
  const breadcrumbItems: { name: string; url: string }[] = [
    {
      name: language === 'fr' ? 'Accueil' : 'Home',
      url: `${baseUrl}${langPrefix}/`
    }
  ];
  
  // Add page-specific breadcrumb
  const pageLabels: Record<string, { fr: string; en: string }> = {
    dilia: { fr: 'Dilia', en: 'Dilia' },
    dilietta: { fr: 'Dilietta', en: 'Dilietta' },
    lacave: { fr: 'La Cave', en: 'La Cave' },
    distribution: { fr: 'Distribution', en: 'Distribution' },
    legal: { fr: 'Mentions légales', en: 'Legal Notice' }
  };
  
  if (page !== 'home' && pageLabels[page]) {
    breadcrumbItems.push({
      name: pageLabels[page][language],
      url: `${baseUrl}${pageData.url}`
    });
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export default SEOHead;
