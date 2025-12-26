import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { useQuoteStore } from '@/lib/store/quote-store';
import { Plus, Check, Download, ArrowLeft, FileText, Info, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSanityQuery } from '@/hooks/useSanity';
import { productBySlugQuery } from '@/lib/sanity/queries';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { toast } from 'sonner';
import type { Product, ProductSpecification } from '@/types';

// Fallback mock products
const mockProducts: Record<string, Product> = {
  'detergent-multi-surface': {
    _id: '1',
    name: 'Détergent Multi-Surface Pro',
    slug: 'detergent-multi-surface',
    description: 'Nettoyant professionnel multi-usages pour toutes surfaces. Formule concentrée haute performance.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80' } }],
    category: { _id: 'c1', name: 'Hygiène & Nettoyage', slug: 'hygiene-nettoyage' },
    specifications: [
      { label: 'Référence', value: 'DET-MUL-001' },
      { label: 'Contenance', value: '5 Litres' },
      { label: 'Dilution', value: '1:50' },
      { label: 'pH', value: '8.5' },
    ]
  },
  'combinaison-travail': {
    _id: '2',
    name: 'Combinaison de Travail',
    slug: 'combinaison-travail',
    description: 'Combinaison professionnelle résistante et confortable pour tous types de travaux.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' } }],
    category: { _id: 'c2', name: 'Vêtements de Travail', slug: 'vetements-travail' },
    specifications: [
      { label: 'Référence', value: 'CMB-TRV-002' },
      { label: 'Tailles', value: 'S, M, L, XL, XXL' },
      { label: 'Matière', value: '100% Coton 300g/m²' },
      { label: 'Norme', value: 'EN ISO 13688' },
    ]
  },
  'cartouche-toner-hp': {
    _id: '3',
    name: 'Cartouche Toner HP',
    slug: 'cartouche-toner-hp',
    description: 'Toner compatible haute qualité pour imprimantes HP. Rendement optimal.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80' } }],
    category: { _id: 'c3', name: 'Matériel Informatique', slug: 'materiel-informatique' },
    specifications: [
      { label: 'Référence', value: 'TNR-HP-003' },
      { label: 'Compatibilité', value: 'HP LaserJet Pro' },
      { label: 'Rendement', value: '3000 pages' },
      { label: 'Couleur', value: 'Noir' },
    ]
  },
  'gel-hydroalcoolique': {
    _id: '4',
    name: 'Gel Hydroalcoolique 5L',
    slug: 'gel-hydroalcoolique',
    description: 'Gel désinfectant professionnel en bidon de 5 litres. Formule virucide.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=800&q=80' } }],
    category: { _id: 'c1', name: 'Hygiène & Nettoyage', slug: 'hygiene-nettoyage' },
    specifications: [
      { label: 'Référence', value: 'GEL-HYD-004' },
      { label: 'Contenance', value: '5 Litres' },
      { label: 'Alcool', value: '70%' },
      { label: 'Norme', value: 'EN 14476' },
    ]
  },
  'chaussures-securite-s3': {
    _id: '5',
    name: 'Chaussures de Sécurité S3',
    slug: 'chaussures-securite-s3',
    description: 'Chaussures de sécurité norme S3, embout acier et semelle anti-perforation.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' } }],
    category: { _id: 'c2', name: 'Vêtements de Travail', slug: 'vetements-travail' },
    specifications: [
      { label: 'Référence', value: 'CHS-S3-005' },
      { label: 'Pointures', value: '38 à 47' },
      { label: 'Norme', value: 'EN ISO 20345 S3' },
      { label: 'Protection', value: 'Embout acier + anti-perforation' },
    ]
  },
  'ramette-papier-a4': {
    _id: '6',
    name: 'Ramette Papier A4',
    slug: 'ramette-papier-a4',
    description: 'Papier blanc 80g/m², 500 feuilles par ramette. Idéal pour impressions quotidiennes.',
    images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80' } }],
    category: { _id: 'c4', name: 'Fournitures de Bureau', slug: 'fournitures-bureau' },
    specifications: [
      { label: 'Référence', value: 'PAP-A4-006' },
      { label: 'Format', value: 'A4 (210 x 297 mm)' },
      { label: 'Grammage', value: '80g/m²' },
      { label: 'Quantité', value: '500 feuilles' },
    ]
  },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  
  // Fetch from Sanity
  const { data: sanityProduct, loading, error } = useSanityQuery<Product>(productBySlugQuery, { slug });
  
  // Use Sanity product if available, otherwise fallback to mock
  const product = sanityProduct || (slug ? mockProducts[slug] : null);
  
  const addItem = useQuoteStore((state) => state.addItem);
  const isInQuote = useQuoteStore((state) => product ? state.isInQuote(product._id) : false);

  const handleAddToQuote = () => {
    if (product) {
      addItem({ 
        id: product._id, 
        name: product.name, 
        slug: product.slug, 
        image: product.images[0]?.asset?.url 
      });
      toast.success(t('addedToQuote'), {
        description: product.name,
        action: {
          label: t('requestQuote'),
          onClick: () => window.location.href = '/contact'
        }
      });
    }
  };

  // Show error toast if Sanity fetch fails
  if (error) {
    toast.error(t('error'), {
      description: 'Erreur lors du chargement du produit'
    });
  }

  // Breadcrumb items for JSON-LD
  const breadcrumbItems = product ? [
    { name: 'Accueil', url: '/' },
    { name: 'Produits', url: '/products' },
    { name: product.name, url: `/products/${product.slug}` }
  ] : [];

  if (loading) {
    return (
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
        <Loader2 className="h-8 w-8 animate-spin text-orange" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
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
  const hasDatasheet = typeof product.datasheet === 'string' && product.datasheet.length > 0;

  return (
    <>
      <SEOHead 
        title={product.name} 
        description={product.description.slice(0, 160)}
      />
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <main className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange mt-6 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour au catalogue
          </Link>
          
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Gallery */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 lg:p-8 bg-muted/20"
              >
                <ImageGallery images={product.images} productName={product.name} />
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
                
                <div className="space-y-4 mt-auto">
                  <button 
                    onClick={handleAddToQuote}
                    disabled={isInQuote}
                    className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      isInQuote 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-orange text-white hover:bg-orange-dark hover:scale-[1.02]'
                    }`}
                  >
                    {isInQuote ? (
                      <>
                        <Check className="h-5 w-5" /> {t('addedToQuote')}
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" /> {t('addToQuote')}
                      </>
                    )}
                  </button>
                  
                  {isInQuote && (
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-orange text-orange rounded-xl font-semibold hover:bg-orange hover:text-white transition-all"
                    >
                      <FileText className="h-5 w-5" />
                      {t('requestQuote')}
                    </Link>
                  )}
                </div>
                
                {/* Fiche technique PDF */}
                {hasDatasheet && (
                  <a
                    href={product.datasheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      toast.success(t('downloadDatasheet'), {
                        description: 'Téléchargement en cours...'
                      });
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-orange hover:underline font-medium"
                  >
                    <Download className="h-5 w-5" />
                    {t('downloadDatasheet')} (PDF)
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
            className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-orange/5 border border-primary/10 rounded-2xl text-center"
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
