import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Monitor, ArrowRight } from 'lucide-react';
import { useSanityQuery } from '@/hooks/useSanity';
import { allCategoriesQuery } from '@/lib/sanity/queries';
import type { Category } from '@/types';

// Fallback categories with local images
const fallbackCategories = [
  {
    _id: 'hygiene',
    name: "Produits d'Hygiène",
    slug: 'hygiene',
    icon: '🧴',
    description: "Détergents, désinfectants, consommables sanitaires pour une hygiène irréprochable.",
    image: 'https://images.unsplash.com/photo-1584813539916-eda6b78b3d43?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-500 to-cyan-500',
    Icon: Sparkles,
  },
  {
    _id: 'epi',
    name: 'Vêtements & EPI',
    slug: 'epi',
    icon: '👷',
    description: "Équipements de protection individuelle, vêtements de travail aux normes.",
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    color: 'from-orange to-amber-500',
    Icon: Shield,
  },
  {
    _id: 'informatique',
    name: 'Matériel Informatique',
    slug: 'informatique',
    icon: '💻',
    description: "Ordinateurs, imprimantes, consommables d'impression, fournitures de bureau.",
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-500 to-pink-500',
    Icon: Monitor,
  },
];

// Color mapping for dynamic categories
const colorMap: Record<string, string> = {
  'hygiene': 'from-blue-500 to-cyan-500',
  'epi': 'from-orange to-amber-500',
  'informatique': 'from-purple-500 to-pink-500',
  'default': 'from-primary to-primary/70',
};

// Icon mapping for dynamic categories
const iconMap: Record<string, typeof Sparkles> = {
  'hygiene': Sparkles,
  'epi': Shield,
  'informatique': Monitor,
};

export function CategoriesSection() {
  const { data: sanityCategories } = useSanityQuery<Category[]>(allCategoriesQuery);

  // Use Sanity categories if available, otherwise fallback
  const categories = sanityCategories && sanityCategories.length > 0 
    ? sanityCategories.map(cat => ({
        ...cat,
        color: colorMap[cat.slug] || colorMap['default'],
        Icon: iconMap[cat.slug] || Sparkles,
        image: cat.image || fallbackCategories.find(f => f.slug === cat.slug)?.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80',
      }))
    : fallbackCategories;

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-orange tracking-widest uppercase mb-2 block">
            Nos Domaines
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explorez Nos Catégories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SWH Distribution vous accompagne dans tous vos besoins professionnels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.Icon;
            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.slug}`}
                  className="group block relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Image de fond */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Contenu */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="flex items-center gap-3 mb-3">
                      {IconComponent && <IconComponent className="h-6 w-6" />}
                      <h3 className="font-serif text-xl font-bold">{category.name}</h3>
                    </div>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                      {category.description || `Découvrez notre gamme ${category.name.toLowerCase()}`}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-orange group-hover:gap-3 transition-all">
                      Voir les produits
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
