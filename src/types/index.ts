// Types pour le catalogue produits

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface SanityImage {
  _key?: string;
  asset: {
    _ref: string;
    url?: string;
  };
  alt?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: SanityImage[];
  category?: Category;
  datasheet?: {
    asset: {
      url: string;
    };
  };
  hasDatasheet?: boolean;
}

export interface QuoteItem {
  productId: string;
  productName: string;
  productSlug: string;
  quantity: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  products: QuoteItem[];
  honeypot?: string;
}

// Configuration SEO
export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle: string;
  ownerEmail: string;
}

export const seoConfig: SEOConfig = {
  siteUrl: 'https://votresite.com', // À remplacer par votre domaine
  siteName: 'Votre Entreprise',
  defaultTitle: 'Votre Entreprise | Catalogue Produits',
  defaultDescription: 'Découvrez notre catalogue de produits de qualité. Parcourez nos références et demandez un devis gratuit.',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@votreentreprise',
  ownerEmail: 'contact@votreentreprise.com',
};
