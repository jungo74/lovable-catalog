import { SEOHead } from '@/components/seo/SEOHead';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ProductsPreview } from '@/components/home/ProductsPreview';
import { CustomRequestSection } from '@/components/home/CustomRequestSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ContactSection } from '@/components/home/ContactSection';

const mockProducts = [
  { _id: '1', name: 'Produit Excellence', slug: 'produit-excellence', description: 'Un produit de qualité supérieure.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c1', name: "Produits d'Hygiène", slug: 'hygiene' } },
  { _id: '2', name: 'Solution Premium', slug: 'solution-premium', description: 'La solution idéale pour vos projets.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c2', name: 'Vêtements & EPI', slug: 'epi' } },
  { _id: '3', name: 'Gamme Prestige', slug: 'gamme-prestige', description: 'Notre gamme prestige haut de gamme.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c3', name: 'Matériel Informatique', slug: 'informatique' } },
];

const Index = () => {
  return (
    <>
      <SEOHead
        title="Accueil"
        description="SWH Négoce - Votre partenaire de confiance pour produits d'hygiène, vêtements de travail et matériel informatique au Maroc. Demandez un devis gratuit."
      />
      
      <main>
        <HeroCarousel />
        <CategoriesSection />
        <FeaturesSection />
        <ProductsPreview products={mockProducts} />
        <CustomRequestSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
