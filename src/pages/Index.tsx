import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ProductsPreview } from '@/components/home/ProductsPreview';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ContactSection } from '@/components/home/ContactSection';

// Mock products pour la démo (à remplacer par Sanity)
const mockProducts = [
  {
    _id: '1',
    name: 'Produit Excellence',
    slug: 'produit-excellence',
    description: 'Un produit de qualité supérieure pour tous vos besoins professionnels.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80' } }],
    category: { _id: 'c1', name: 'Catégorie A', slug: 'categorie-a' },
  },
  {
    _id: '2',
    name: 'Solution Premium',
    slug: 'solution-premium',
    description: 'La solution idéale pour optimiser vos processus et améliorer vos résultats.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80' } }],
    category: { _id: 'c2', name: 'Catégorie B', slug: 'categorie-b' },
  },
  {
    _id: '3',
    name: 'Gamme Prestige',
    slug: 'gamme-prestige',
    description: 'Notre gamme prestige pour les projets les plus exigeants.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' } }],
    category: { _id: 'c1', name: 'Catégorie A', slug: 'categorie-a' },
  },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title="Accueil"
        description="Découvrez notre catalogue de produits de qualité. Parcourez nos références et demandez un devis gratuit."
        canonical="/"
      />
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsPreview products={mockProducts} />
        <ProcessSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
