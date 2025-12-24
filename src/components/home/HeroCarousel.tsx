import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, ArrowRight, ChevronDown } from 'lucide-react';
import type { HeroSlide } from '@/types';

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlide = slides[currentIndex];

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Images - toutes préchargées */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.05
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{ zIndex: index === currentIndex ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span className="text-white/80 text-sm font-medium tracking-wide">
                Votre Partenaire de Confiance
              </span>
            </motion.div>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight">
                  {currentSlide.title}
                </h1>
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-orange mb-6">
                  {currentSlide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed"
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-all hover:scale-105 shadow-lg shadow-orange/25"
              >
                <Mail className="h-5 w-5" />
                Demander un Devis
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-lg font-semibold hover:bg-white/90 transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                Contactez-nous
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-4 text-white font-medium hover:text-orange transition-colors group"
              >
                Voir le Catalogue
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-8 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'w-10 bg-orange' 
                : 'w-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
