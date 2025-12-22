import { Helmet } from 'react-helmet-async';
import { seoConfig } from '@/types';

// JSON-LD Organization (pour la page d'accueil)
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/logo.png`,
    description: seoConfig.defaultDescription,
    contactPoint: {
      '@type': 'ContactPoint',
      email: seoConfig.ownerEmail,
      contactType: 'customer service',
      availableLanguage: ['French'],
    },
    sameAs: [
      // Ajouter les URLs des réseaux sociaux ici
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

// JSON-LD Product (pour les pages produit - SANS prix ni Offer)
interface ProductJsonLdProps {
  name: string;
  description: string;
  images: string[];
  category?: string;
  slug: string;
}

export function ProductJsonLd({
  name,
  description,
  images,
  category,
  slug,
}: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: images,
    url: `${seoConfig.siteUrl}/products/${slug}`,
    brand: {
      '@type': 'Brand',
      name: seoConfig.siteName,
    },
    ...(category && { category: category }),
    // PAS de offers, price, priceCurrency - c'est un catalogue sans prix
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

// JSON-LD BreadcrumbList (fil d'Ariane)
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

// JSON-LD WebSite (pour le site global)
export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    inLanguage: 'fr-FR',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
