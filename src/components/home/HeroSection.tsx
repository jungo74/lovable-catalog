import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Image de fond avec effet parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Nos produits de qualité"
          className="w-full h-full object-cover"
          loading="eager"
          width={1920}
          height={1080}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-hero-overlay/60 via-hero-overlay/40 to-hero-overlay/70" />
      </motion.div>

      {/* Contenu */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block text-sm font-medium tracking-widest uppercase text-primary-foreground/80"
        >
          Catalogue Produits
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-4xl"
        >
          Découvrez Notre
          <br />
          <span className="text-accent">Excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 max-w-2xl text-lg md:text-xl text-primary-foreground/90"
        >
          Des produits de qualité supérieure pour répondre à tous vos besoins.
          Parcourez notre catalogue et demandez un devis personnalisé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary-foreground px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Voir les produits
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-foreground/50 px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10 hover:border-primary-foreground"
          >
            Demander un devis
          </Link>
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
