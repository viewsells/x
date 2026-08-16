import { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article' | 'product';
  schemaData?: object | object[];
}

export const SEOHead = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  schemaData
}: SEOHeadProps) => {
  useEffect(() => {
    // 1. Update Document Title (Preserving 50-60 character optimal SEO length)
    document.title = title;

    // 2. Helper to set/update meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 3. Update primary metadata
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', siteConfig.name, true);

    const fullUrl = `https://buygithubaccounts.com${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setMeta('og:url', fullUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    // 4. Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = fullUrl;

    // 5. Build Base Organization & Identity Schema
    const organizationSchema = {
      '@type': 'Organization',
      '@id': 'https://buygithubaccounts.com/#organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: `${siteConfig.siteUrl}/favicon.svg`,
      description: 'Developer marketplace providing verified GitHub developer accounts and repository promotion services.',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'customer service',
        availableLanguage: ['English']
      },
      sameAs: [
        siteConfig.officialTelegramUrl,
        siteConfig.officialWhatsAppUrl,
        ...(siteConfig.socialProfiles.twitter ? [siteConfig.socialProfiles.twitter] : []),
        ...(siteConfig.socialProfiles.facebook ? [siteConfig.socialProfiles.facebook] : []),
        ...(siteConfig.socialProfiles.linkedin ? [siteConfig.socialProfiles.linkedin] : [])
      ]
    };

    // 6. Update or inject structured schema.org JSON-LD graph
    const existingSchemaScript = document.getElementById('schema-jsonld');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    const graphItems: object[] = [organizationSchema];

    if (schemaData) {
      if (Array.isArray(schemaData)) {
        graphItems.push(...schemaData);
      } else {
        graphItems.push(schemaData);
      }
    }

    const script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graphItems
    });
    document.head.appendChild(script);

    // 7. Configurable Google Analytics 4 (Non-blocking async injection if enabled)
    if (siteConfig.analytics.enabled && siteConfig.analytics.gaMeasurementId) {
      const gaId = siteConfig.analytics.gaMeasurementId;
      if (!document.getElementById('ga-gtag')) {
        const gaScript = document.createElement('script');
        gaScript.id = 'ga-gtag';
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(gaScript);

        const gaInit = document.createElement('script');
        gaInit.id = 'ga-init';
        gaInit.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { 'send_page_view': true });
        `;
        document.head.appendChild(gaInit);
      }
    }
  }, [title, description, canonicalPath, ogType, schemaData]);

  return null;
};
