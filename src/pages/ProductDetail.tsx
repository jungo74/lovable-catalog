import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { useQuoteStore } from '@/lib/store/quote-store';
import { Plus, Check, Download, ArrowLeft, FileText, Info } from 'lucide-react';
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
  'detergent-multi-surface': {
    _id: '4',
    name: 'Détergent Multi-Surface Pro',
    slug: 'detergent-multi-surface',
    description: 'Nettoyant professionnel multi-usages pour toutes surfaces. Formule concentrée haute performance.',
    images: [{ asset: { url: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80' } }],
    category: { name: 'Hygiène & Nettoyage', slug: 'hygiene-nettoyage' },
    specifications: [
      { label: 'Référence', value: 'DET-MUL-004' },
      { label: 'Contenance', value: '5 Litres' },
      { label: 'Dilution', value: '1:50' },
      { label: 'pH', value: '8.5' },
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
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold mb-4">Produit non trouvé</h1>
          <p className="text-muted-foreground mb-6">Ce produit n'existe pas ou n'est plus disponible.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-lg font-medium hover:bg-orange-dark transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour au catalogue
          </Link>
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
      />
      
      <main className="pt-20 pb-16 min-h-screen bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange mt-6 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour au catalogue
          </Link>
          
          <div className="bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square bg-muted"
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
                className="p-8 lg:p-12 flex flex-col"
              >
                {product.category && (
                  <Link 
                    to={`/products?category=${product.category.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-orange mb-4 hover:underline w-fit"
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
                  <div className="mb-8 flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="h-5 w-5 text-orange" />
                      <h2 className="font-semibold text-lg">Caractéristiques techniques</h2>
                    </div>
                    <div className="bg-muted/50 rounded-xl overflow-hidden">
                      {specifications.map((spec, index) => (
                        <div 
                          key={index} 
                          className={`flex justify-between items-center px-5 py-3.5 ${
                            index % 2 === 0 ? 'bg-muted/30' : ''
                          }`}
                        >
                          <span className="text-muted-foreground text-sm">{spec.label}</span>
                          <span className="font-medium text-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="space-y-4 mt-auto">
                  <button 
                    onClick={() => addItem({ id: product._id, name: product.name, slug: product.slug })} 
                    className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      isInQuote 
                        ? 'bg-green-500 text-white' 
                        : 'bg-orange text-white hover:bg-orange-dark hover:scale-[1.02]'
                    }`}
                  >
                    {isInQuote ? (
                      <>
                        <Check className="h-5 w-5" /> Ajouté au devis
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" /> Ajouter au devis
                      </>
                    )}
                  </button>
                  
                  {isInQuote && (
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-orange text-orange rounded-xl font-semibold hover:bg-orange hover:text-white transition-all"
                    >
                      <FileText className="h-5 w-5" />
                      Finaliser ma demande de devis
                    </Link>
                  )}
                </div>
                
                {/* Fiche technique */}
                {product.datasheet?.asset?.url && (
                  <a
                    href={product.datasheet.asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-orange hover:underline"
                  >
                    <Download className="h-5 w-5" />
                    Télécharger la fiche technique
                  </a>
                )}
              </motion.div>
            </div>
          </div>

          {/* Section produit introuvable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-2xl text-center"
          >
            <h3 className="font-serif text-xl font-bold mb-2">Besoin d'un produit similaire ou spécifique ?</h3>
            <p className="text-muted-foreground mb-4">
              Nous pouvons sourcer n'importe quel produit pour vous, même s'il n'est pas dans notre catalogue.
            </p>
            <Link
              to="/contact?custom=true"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-lg font-medium hover:bg-orange-dark transition-colors"
            >
              Faire une demande spéciale
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
