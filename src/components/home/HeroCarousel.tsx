import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '@/types';

// Images de démonstration - À remplacer par vos propres images
const slides: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80',
    title: "Produits d'Hygiène",
    subtitle: '& Consommables',
    description: "Découvrez notre gamme complète de produits d'hygiène professionnelle, détergents, désinfectants et consommables de qualité pour entreprises.",
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
    title: 'Vêtements de Travail',
    subtitle: '& Équipements de Sécurité',
    description: "Équipez vos équipes avec nos vêtements de travail, EPI, chaussures de sécurité et matériel de chantier aux normes professionnelles.",
  },
  {
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1920&q=80',
    title: 'Matériel Informatique',
    subtitle: "& Consommables d'Impression",
    description: "Ordinateurs, imprimantes, toners, cartouches d'encre et fournitures de bureau pour optimiser votre environnement de travail.",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Images avec animation */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-hero-overlay/70 via-hero-overlay/50 to-hero-overlay/80" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.span
          key={`badge-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block text-sm font-medium tracking-widest uppercase text-white/80"
        >
          SWH Distribution
        </motion.span>

        <motion.h1
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-2 font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl"
        >
          {currentSlide.title}
        </motion.h1>

        <motion.span
          key={`subtitle-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-orange"
        >
          {currentSlide.subtitle}
        </motion.span>

        <motion.p
          key={`desc-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 max-w-3xl text-base md:text-lg text-white/90"
        >
          {currentSlide.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-orange-dark"
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

      {/* Contrôles du carousel */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Indicateurs */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-orange w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Slide suivant"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Numéro de licence */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs z-20">
        N° Registre Commerce: 002075015000049
      </div>
    </section>
  );
}
