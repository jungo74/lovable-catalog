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

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  images: SanityImage[];
  category?: Category;
  specifications?: ProductSpecification[];
  datasheet?: {
    asset: {
      url: string;
    };
  };
  hasDatasheet?: boolean;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
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
  phone?: string;
  company?: string;
  ice?: string;
  message: string;
  customRequest?: string;
  products: QuoteItem[];
  attachment?: File | null;
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
