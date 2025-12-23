import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { useQuoteStore } from '@/lib/store/quote-store';
import { Plus, Check, Download, ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProductSpecification } from '@/types';

const mockProducts: Record<string, any> = {
  'produit-excellence': { 
    _id: '1', 
    name: 'Produit Excellence', 
    slug: 'produit-excellence', 
    description: 'Un produit de qualité supérieure pour tous vos besoins professionnels. Conçu avec les meilleurs matériaux et une attention particulière aux détails.', 
    images: [{ asset: { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80' } }], 
    category: { name: "Produits d'Hygiène", slug: 'hygiene' },
    specifications: [
      { label: 'Référence', value: 'PRD-EXC-001' },
      { label: 'Contenance', value: '5 Litres' },
      { label: 'Type', value: 'Détergent multi-surfaces' },
      { label: 'pH', value: 'Neutre (7)' },
      { label: 'Certification', value: 'ECOCERT' },
    ]
  },
  'solution-premium': { 
    _id: '2', 
    name: 'Solution Premium', 
    slug: 'solution-premium', 
    description: 'La solution idéale pour optimiser vos processus et améliorer vos résultats. Performance et fiabilité garanties.', 
    images: [{ asset: { url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80' } }], 
    category: { name: 'Vêtements & EPI', slug: 'epi' },
    specifications: [
      { label: 'Référence', value: 'SOL-PRM-002' },
      { label: 'Tailles disponibles', value: 'S, M, L, XL, XXL' },
      { label: 'Matière', value: '100% Coton 300g/m²' },
      { label: 'Couleurs', value: 'Bleu, Noir, Gris' },
      { label: 'Norme', value: 'EN ISO 13688' },
    ]
  },
  'gamme-prestige': { 
    _id: '3', 
    name: 'Gamme Prestige', 
    slug: 'gamme-prestige', 
    description: 'Notre gamme prestige pour les projets les plus exigeants. Excellence et raffinement à chaque détail.', 
    images: [{ asset: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' } }], 
    category: { name: 'Matériel Informatique', slug: 'informatique' },
    specifications: [
      { label: 'Référence', value: 'GAM-PRE-003' },
      { label: 'Type', value: 'Ordinateur portable' },
      { label: 'Processeur', value: 'Intel Core i7' },
      { label: 'RAM', value: '16 Go DDR4' },
      { label: 'Stockage', value: 'SSD 512 Go' },
      { label: 'Écran', value: '15.6" Full HD' },
    ]
  },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? mockProducts[slug] : null;
  const addItem = useQuoteStore((state) => state.addItem);
  const isInQuote = useQuoteStore((state) => product ? state.isInQuote(product._id) : false);

  if (!product) {
    return (
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Link to="/products" className="text-orange hover:underline">Retour au catalogue</Link>
        </div>
      </main>
    );
  }

  const specifications: ProductSpecification[] = product.specifications || [];

  return (
    <>
      <SEOHead 
        title={product.name} 
        description={product.description.slice(0, 160)} 
        canonical={`/products/${product.slug}`} 
        image={product.images[0]?.asset?.url} 
      />
      <ProductJsonLd 
        name={product.name} 
        description={product.description} 
        images={[product.images[0]?.asset?.url]} 
        category={product.category?.name} 
        slug={product.slug} 
      />
      <BreadcrumbJsonLd items={[
        { name: 'Accueil', url: '/' }, 
        { name: 'Produits', url: '/products' }, 
        { name: product.name, url: `/products/${product.slug}` }
      ]} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour au catalogue
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square rounded-2xl overflow-hidden bg-muted"
            >
              <img 
                src={product.images[0]?.asset?.url} 
                alt={product.name} 
                className="w-full h-full object-cover" 
                width={800} 
                height={800} 
              />
            </motion.div>
            
            {/* Informations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {product.category && (
                <Link 
                  to={`/products?category=${product.category.slug}`}
                  className="inline-block text-sm font-medium text-orange mb-3 hover:underline"
                >
                  {product.category.name}
                </Link>
              )}
              
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Spécifications techniques */}
              {specifications.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-semibold text-lg mb-4">Caractéristiques</h2>
                  <div className="bg-muted rounded-xl p-4 space-y-3">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => addItem({ id: product._id, name: product.name, slug: product.slug })} 
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${
                    isInQuote 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-orange text-white hover:bg-orange-dark'
                  }`}
                >
                  {isInQuote ? (
                    <>
                      <Check className="h-5 w-5" /> Dans le panier
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" /> Ajouter au panier
                    </>
                  )}
                </button>
                
                {isInQuote && (
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-orange text-orange rounded-lg font-semibold hover:bg-orange hover:text-white transition-all"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Voir le panier
                  </Link>
                )}
              </div>
              
              {/* Fiche technique */}
              {product.datasheet?.asset?.url && (
                <a
                  href={product.datasheet.asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Download className="h-5 w-5" />
                  Télécharger la fiche technique
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;