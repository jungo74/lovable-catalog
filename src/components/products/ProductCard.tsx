import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import type { Product } from '@/types';
import { useQuoteStore } from '@/lib/store/quote-store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useQuoteStore((state) => state.addItem);
  const isInQuote = useQuoteStore((state) => state.isInQuote(product._id));

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product._id, name: product.name, slug: product.slug, image: imageUrl });
  };

  const imageUrl = product.images?.[0]?.asset?.url 
    || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80';

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-orange/30 hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={300}
        />
        {/* Badge catégorie */}
        {product.category && (
          <span className="absolute top-3 left-3 px-3 py-1.5 bg-background/95 backdrop-blur-sm text-xs font-medium rounded-full border border-border">
            {product.category.name}
          </span>
        )}
        {/* Bouton ajouter au devis */}
        <button
          onClick={handleAddToQuote}
          className={`absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isInQuote
              ? 'bg-green-500 text-white'
              : 'bg-orange text-white opacity-0 group-hover:opacity-100 hover:bg-orange-dark'
          }`}
          aria-label={isInQuote ? 'Ajouté au devis' : 'Ajouter au devis'}
        >
          {isInQuote ? (
            <>
              <Check className="h-4 w-4" />
              Ajouté
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Devis
            </>
          )}
        </button>
      </div>

      {/* Contenu */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-orange transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
}
