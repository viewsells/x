import { useEffect } from 'react';

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
    // 1. Update Document Title
    const siteTitle = 'BuyGitHubAccounts.com';
    document.title = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

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
    setMeta('og:site_name', 'BuyGitHubAccounts.com', true);

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

    // 5. Update or inject structured schema.org JSON-LD
    const existingSchemaScript = document.getElementById('schema-jsonld');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schemaData) {
      const script = document.createElement('script');
      script.id = 'schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(
        Array.isArray(schemaData)
          ? {
              '@context': 'https://schema.org',
              '@graph': schemaData
            }
          : {
              '@context': 'https://schema.org',
              ...schemaData
            }
      );
      document.head.appendChild(script);
    }

    return () => {
      // Clean up script on unmount if needed
    };
  }, [title, description, canonicalPath, ogType, schemaData]);

  return null;
};
