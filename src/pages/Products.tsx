import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, ArrowRight, LayoutGrid, List, Loader2 } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductCard } from '@/components/products/ProductCard';
import { motion } from 'framer-motion';
import { useSanityQuery } from '@/hooks/useSanity';
import { allProductsQuery, allCategoriesQuery } from '@/lib/sanity/queries';
import type { Product, Category } from '@/types';

// Fallback mock data
const mockCategories = [
  { _id: 'c1', name: 'Hygiène & Nettoyage', slug: 'hygiene-nettoyage', icon: '🧴' },
  { _id: 'c2', name: 'Vêtements de Travail', slug: 'vetements-travail', icon: '👷' },
  { _id: 'c3', name: 'Matériel Informatique', slug: 'materiel-informatique', icon: '💻' },
  { _id: 'c4', name: 'Fournitures de Bureau', slug: 'fournitures-bureau', icon: '📎' },
];

const mockProducts = [
  { _id: '1', name: 'Détergent Multi-Surface Pro', slug: 'detergent-multi-surface', description: 'Nettoyant professionnel multi-usages pour toutes surfaces.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c1', name: 'Hygiène & Nettoyage', slug: 'hygiene-nettoyage' } },
  { _id: '2', name: 'Combinaison de Travail', slug: 'combinaison-travail', description: 'Combinaison professionnelle résistante et confortable.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c2', name: 'Vêtements de Travail', slug: 'vetements-travail' } },
  { _id: '3', name: 'Cartouche Toner HP', slug: 'cartouche-toner-hp', description: 'Toner compatible haute qualité pour imprimantes HP.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c3', name: 'Matériel Informatique', slug: 'materiel-informatique' } },
  { _id: '4', name: 'Gel Hydroalcoolique 5L', slug: 'gel-hydroalcoolique', description: 'Gel désinfectant professionnel en bidon de 5 litres.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c1', name: 'Hygiène & Nettoyage', slug: 'hygiene-nettoyage' } },
  { _id: '5', name: 'Chaussures de Sécurité S3', slug: 'chaussures-securite-s3', description: 'Chaussures de sécurité norme S3, embout acier.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c2', name: 'Vêtements de Travail', slug: 'vetements-travail' } },
  { _id: '6', name: 'Ramette Papier A4', slug: 'ramette-papier-a4', description: 'Papier blanc 80g/m², 500 feuilles par ramette.', images: [{ asset: { _ref: '', url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80' } }], category: { _id: 'c4', name: 'Fournitures de Bureau', slug: 'fournitures-bureau' } },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch from Sanity
  const { data: sanityProducts, loading: loadingProducts } = useSanityQuery<Product[]>(allProductsQuery);
  const { data: sanityCategories, loading: loadingCategories } = useSanityQuery<Category[]>(allCategoriesQuery);

  // Use Sanity data if available, otherwise fallback to mock
  const products = sanityProducts && sanityProducts.length > 0 ? sanityProducts : mockProducts;
  const categories = sanityCategories && sanityCategories.length > 0 ? sanityCategories : mockCategories;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category?._id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, products]);

  const selectedCategoryName = selectedCategory 
    ? categories.find(c => c._id === selectedCategory)?.name 
    : null;

  const isLoading = loadingProducts || loadingCategories;

  return (
    <>
      <SEOHead
        title="Catalogue Produits"
        description="Explorez notre gamme complète de produits professionnels : hygiène, vêtements de travail, matériel informatique. Demandez un devis personnalisé."
      />
      <main className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="text-center py-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Notre Catalogue
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Découvrez notre sélection de produits professionnels de qualité
            </motion.p>
          </div>

          {/* Barre de recherche + Toggle vue */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-all"
                />
              </div>
              <div className="flex rounded-xl border border-border bg-background overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-4 transition-colors ${viewMode === 'grid' ? 'bg-orange text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  aria-label="Vue grille"
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-4 transition-colors ${viewMode === 'list' ? 'bg-orange text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  aria-label="Vue liste"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Filtres catégories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                !selectedCategory
                  ? 'bg-orange text-white shadow-lg shadow-orange/25'
                  : 'bg-background border border-border text-foreground hover:border-orange/50'
              }`}
            >
              Tous les produits
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                  selectedCategory === category._id
                    ? 'bg-orange text-white shadow-lg shadow-orange/25'
                    : 'bg-background border border-border text-foreground hover:border-orange/50'
                }`}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange" />
            </div>
          )}

          {/* Résultats */}
          {!isLoading && selectedCategoryName && (
            <p className="text-center text-muted-foreground mb-6">
              {filteredProducts.length} produit(s) dans <span className="font-medium text-foreground">{selectedCategoryName}</span>
            </p>
          )}

          {/* Grille ou Liste produits */}
          {!isLoading && filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl mx-auto">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      to={`/products/${product.slug}`}
                      className="flex gap-4 md:gap-6 bg-background rounded-xl p-4 border border-border hover:border-orange/50 hover:shadow-md transition-all group"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={product.images?.[0]?.asset?.url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-xs text-orange font-medium mb-1">
                          {product.category?.name}
                        </span>
                        <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-orange transition-colors truncate">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 hidden md:block">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-orange group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )
          ) : !isLoading && (
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Nous n'avons pas trouvé de produit correspondant à votre recherche.
              </p>
            </div>
          )}

          {/* Section "Produit introuvable" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange rounded-full text-sm font-medium mb-4">
                Service sur mesure
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                Vous ne trouvez pas votre produit ?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Grâce à notre réseau de fournisseurs, <strong className="text-orange">SWH NEGOCE</strong> peut 
                vous procurer n'importe quel produit, même s'il n'est pas dans notre catalogue.
              </p>
              <Link
                to="/contact?custom=true"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-all hover:scale-105"
              >
                Faire une demande spéciale
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Products;
