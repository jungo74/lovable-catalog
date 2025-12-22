import { Helmet } from 'react-helmet-async';
import { seoConfig } from '@/types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;
  const fullDescription = description || seoConfig.defaultDescription;
  const fullCanonical = canonical
    ? `${seoConfig.siteUrl}${canonical}`
    : seoConfig.siteUrl;
  const fullImage = image
    ? image.startsWith('http')
      ? image
      : `${seoConfig.siteUrl}${image}`
    : `${seoConfig.siteUrl}${seoConfig.defaultImage}`;

  return (
    <Helmet>
      {/* Titre */}
      <title>{fullTitle}</title>

      {/* Meta de base */}
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullCanonical} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}
