import { motion } from 'framer-motion';
import { Search, PlusCircle, Send, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Parcourez',
    description: 'Explorez notre catalogue et découvrez nos produits de qualité.',
  },
  {
    icon: PlusCircle,
    step: '02',
    title: 'Sélectionnez',
    description: 'Ajoutez les produits qui vous intéressent à votre sélection de devis.',
  },
  {
    icon: Send,
    step: '03',
    title: 'Envoyez',
    description: 'Transmettez votre demande via notre formulaire de contact.',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Recevez',
    description: 'Recevez votre devis personnalisé sous 24 heures.',
  },
];

export function ProcessSection() {
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
            Comment Ça Marche
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Demander un devis n'a jamais été aussi simple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Ligne de connexion */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              {/* Numéro */}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 relative">
                <step.icon className="h-10 w-10 text-primary" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
