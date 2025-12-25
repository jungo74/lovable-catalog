// Types pour le catalogue produits

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
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
  productImage?: string;
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

// Configuration SEO simplifiée
export interface SEOConfig {
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  ownerEmail: string;
  ownerPhone: string;
  whatsapp: string;
  ice: string;
  address: string;
}

export const seoConfig: SEOConfig = {
  siteUrl: 'https://www.swhnegoce.com',
  siteName: 'SWH NEGOCE',
  defaultTitle: 'SWH NEGOCE | Fournitures Professionnelles au Maroc',
  defaultDescription: 'Votre partenaire de confiance pour produits d\'hygiène, vêtements de travail et matériel informatique au Maroc.',
  ownerEmail: 'contact@swhnegoce.com',
  ownerPhone: '+212 1 23 45 67 89',
  whatsapp: '+212612345678',
  ice: '002075015000049',
  address: 'Zone Industrielle, Casablanca, Maroc',
};
