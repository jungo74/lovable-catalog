import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { seoConfig } from '@/types';

export function ContactSection() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Prêt à Démarrer Votre Projet ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto"
          >
            Contactez-nous dès maintenant pour discuter de vos besoins et recevoir un devis personnalisé.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-foreground rounded-lg font-semibold transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Demander un devis
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80"
          >
            <a
              href={`mailto:${seoConfig.ownerEmail}`}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              {seoConfig.ownerEmail}
            </a>
            <span className="hidden sm:block">•</span>
            <a
              href="tel:+33123456789"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-5 w-5" />
              +33 1 23 45 67 89
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
