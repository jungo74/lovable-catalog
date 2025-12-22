import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
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
    addItem({ id: product._id, name: product.name, slug: product.slug });
  };

  // Placeholder image if no images
  const imageUrl = product.images?.[0]?.asset?.url 
    || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80';

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
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
          <span className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-full">
            {product.category.name}
          </span>
        )}
        {/* Bouton ajouter */}
        <button
          onClick={handleAddToQuote}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isInQuote
              ? 'bg-success text-success-foreground'
              : 'bg-primary text-primary-foreground opacity-0 group-hover:opacity-100'
          }`}
          aria-label="Ajouter au devis"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-4 md:p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
}
