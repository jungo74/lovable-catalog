import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Truck, CheckCircle } from 'lucide-react';

import heroHygiene from '@/assets/hero-hygiene.jpg';
import heroWorkwear from '@/assets/hero-workwear.jpg';
import heroIT from '@/assets/hero-it.jpg';

export function CustomRequestSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-orange tracking-widest uppercase mb-4 block">
              Service exclusif
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Nous Sourçons Pour Vous
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Grâce à notre réseau de fournisseurs étendu, <strong className="text-orange">SWH Distribution</strong> peut 
              vous procurer n'importe quel produit même s'il n'est pas dans notre catalogue. 
              Envoyez-nous votre demande avec une description ou une image du produit recherché.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Search, text: "Décrivez le produit recherché" },
                { icon: MessageSquare, text: "Joignez une photo ou un document" },
                { icon: Truck, text: "Nous sourçons et livrons rapidement" },
                { icon: CheckCircle, text: "Satisfaction garantie" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-orange" />
                  </div>
                  <span className="text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/contact?custom=true"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-all hover:scale-105"
            >
              Faire une demande spéciale
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Grille d'images esthétique */}
            <div className="grid grid-cols-2 gap-4">
              {/* Grande image principale */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]">
                <img
                  src={heroHygiene}
                  alt="Produits d'hygiène professionnelle"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-medium">
                  Produits d'Hygiène
                </span>
              </div>
              
              {/* Deux images secondaires */}
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-square">
                <img
                  src={heroWorkwear}
                  alt="Équipements de sécurité"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-sm font-medium">
                  Vêtements de Travail
                </span>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-square">
                <img
                  src={heroIT}
                  alt="Matériel informatique"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-sm font-medium">
                  Matériel Informatique
                </span>
              </div>
            </div>

            {/* Badge flottant */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-orange text-white p-6 rounded-xl shadow-2xl"
            >
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm opacity-90">Taux de réussite</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
