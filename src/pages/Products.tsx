import { SEOHead } from '@/components/seo/SEOHead';
import { ProductCard } from '@/components/products/ProductCard';

const mockProducts = [
  { _id: '1', name: 'Produit Excellence', slug: 'produit-excellence', description: 'Un produit de qualité supérieure.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c1', name: 'Catégorie A', slug: 'categorie-a' } },
  { _id: '2', name: 'Solution Premium', slug: 'solution-premium', description: 'La solution idéale pour vos projets.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c2', name: 'Catégorie B', slug: 'categorie-b' } },
  { _id: '3', name: 'Gamme Prestige', slug: 'gamme-prestige', description: 'Notre gamme prestige haut de gamme.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c1', name: 'Catégorie A', slug: 'categorie-a' } },
];

const Products = () => {
  return (
    <>
      <SEOHead
        title="Catalogue Produits"
        description="Explorez notre gamme complète de produits. Filtrez par catégorie et demandez un devis."
        canonical="/products"
      />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Notre Catalogue</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Découvrez notre sélection de produits de qualité</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mockProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
