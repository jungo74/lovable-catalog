import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: CheckCircle,
    title: 'Qualité Garantie',
    description: 'Tous nos produits sont rigoureusement sélectionnés pour leur qualité exceptionnelle.',
  },
  {
    icon: Zap,
    title: 'Réactivité',
    description: 'Réponse rapide à toutes vos demandes de devis sous 24 heures.',
  },
  {
    icon: Shield,
    title: 'Fiabilité',
    description: 'Un partenaire de confiance pour tous vos projets depuis plus de 10 ans.',
  },
  {
    icon: Users,
    title: 'Accompagnement',
    description: 'Une équipe dédiée pour vous conseiller et vous guider dans vos choix.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Pourquoi Nous Choisir
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nous nous engageons à vous offrir le meilleur service et des produits d'exception.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 md:p-8 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
