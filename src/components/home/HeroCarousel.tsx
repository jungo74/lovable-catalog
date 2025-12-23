import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { HeroSlide } from '@/types';

// Import des images
import heroHygiene from '@/assets/hero-hygiene.jpg';
import heroWorkwear from '@/assets/hero-workwear.jpg';
import heroIT from '@/assets/hero-it.jpg';

const slides: HeroSlide[] = [
  {
    image: heroHygiene,
    title: "Produits d'Hygiène",
    subtitle: '& Consommables',
    description: "Découvrez notre gamme complète de produits d'hygiène professionnelle, détergents, désinfectants et consommables de qualité pour entreprises.",
  },
  {
    image: heroWorkwear,
    title: 'Vêtements de Travail',
    subtitle: '& Équipements de Sécurité',
    description: "Équipez vos équipes avec nos vêtements de travail, EPI, chaussures de sécurité et matériel de chantier aux normes professionnelles.",
  },
  {
    image: heroIT,
    title: 'Matériel Informatique',
    subtitle: "& Consommables d'Impression",
    description: "Ordinateurs, imprimantes, toners, cartouches d'encre et fournitures de bureau pour optimiser votre environnement de travail.",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentSlide = slides[currentIndex];

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Images avec animation fondu */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            width={1920}
            height={1080}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.span
          key={`badge-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-block text-sm font-medium tracking-widest uppercase text-white/80"
        >
          SWH Distribution
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-2 font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl">
              {currentSlide.title}
            </h1>

            <span className="mb-6 block font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-orange">
              {currentSlide.subtitle}
            </span>

            <p className="mb-8 max-w-3xl mx-auto text-base md:text-lg text-white/90">
              {currentSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-orange-dark hover:scale-105"
          >
            Voir les produits
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/50 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white"
          >
            Demander un devis
          </Link>
        </motion.div>
      </div>

      {/* Indicateurs slide */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? 'bg-orange w-10'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Indicateur de scroll */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Découvrir</span>
        <ChevronDown className="h-6 w-6" />
      </motion.button>

      {/* Numéro de licence */}
      <div className="absolute bottom-4 right-4 text-white/50 text-xs z-20">
        RC: 002075015000049
      </div>
    </section>
  );
}
