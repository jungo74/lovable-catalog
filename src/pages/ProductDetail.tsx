import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { useQuoteStore } from '@/lib/store/quote-store';
import { Plus, Check, Download, ArrowLeft } from 'lucide-react';

const mockProducts: Record<string, any> = {
  'produit-excellence': { _id: '1', name: 'Produit Excellence', slug: 'produit-excellence', description: 'Un produit de qualité supérieure pour tous vos besoins professionnels. Conçu avec les meilleurs matériaux et une attention particulière aux détails.', images: [{ asset: { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80' } }], category: { name: 'Catégorie A', slug: 'categorie-a' } },
  'solution-premium': { _id: '2', name: 'Solution Premium', slug: 'solution-premium', description: 'La solution idéale pour optimiser vos processus et améliorer vos résultats. Performance et fiabilité garanties.', images: [{ asset: { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80' } }], category: { name: 'Catégorie B', slug: 'categorie-b' } },
  'gamme-prestige': { _id: '3', name: 'Gamme Prestige', slug: 'gamme-prestige', description: 'Notre gamme prestige pour les projets les plus exigeants. Excellence et raffinement à chaque détail.', images: [{ asset: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' } }], category: { name: 'Catégorie A', slug: 'categorie-a' } },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? mockProducts[slug] : null;
  const addItem = useQuoteStore((state) => state.addItem);
  const isInQuote = useQuoteStore((state) => product ? state.isInQuote(product._id) : false);

  if (!product) {
    return <div className="pt-24 pb-16 text-center"><p>Produit non trouvé</p></div>;
  }

  return (
    <>
      <SEOHead title={product.name} description={product.description.slice(0, 160)} canonical={`/products/${product.slug}`} image={product.images[0]?.asset?.url} />
      <ProductJsonLd name={product.name} description={product.description} images={[product.images[0]?.asset?.url]} category={product.category?.name} slug={product.slug} />
      <BreadcrumbJsonLd items={[{ name: 'Accueil', url: '/' }, { name: 'Produits', url: '/products' }, { name: product.name, url: `/products/${product.slug}` }]} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> Retour au catalogue
          </Link>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img src={product.images[0]?.asset?.url} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
            </div>
            <div>
              {product.category && <span className="text-sm font-medium text-primary mb-2 block">{product.category.name}</span>}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{product.description}</p>
              <button onClick={() => addItem({ id: product._id, name: product.name, slug: product.slug })} className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${isInQuote ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground hover:bg-primary-dark'}`}>
                {isInQuote ? <><Check className="h-5 w-5" /> Dans le devis</> : <><Plus className="h-5 w-5" /> Ajouter au devis</>}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
