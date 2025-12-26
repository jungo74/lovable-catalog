import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import type { FAQItem } from '@/types';

const faqItems: FAQItem[] = [
  {
    question: "Comment puis-je demander un devis ?",
    answer: "Vous pouvez demander un devis gratuitement en ajoutant les produits souhaités à votre sélection, puis en remplissant le formulaire de contact. Notre équipe vous répondra sous 24 heures avec une offre personnalisée."
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Nos délais de livraison varient selon les produits et votre localisation. En général, nous livrons sous 3 à 7 jours ouvrables sur tout le territoire marocain. Pour les produits en stock, une livraison express en 24-48h est possible."
  },
  {
    question: "Proposez-vous des produits personnalisés ?",
    answer: "Oui, nous proposons des services de personnalisation pour les vêtements de travail (broderie, impression) et certains produits. Contactez-nous pour discuter de vos besoins spécifiques."
  },
  {
    question: "Quelles sont vos conditions de paiement ?",
    answer: "Nous acceptons plusieurs modes de paiement : virement bancaire, chèque, et paiement à la livraison pour certaines commandes. Des facilités de paiement sont disponibles pour les professionnels avec un compte client."
  },
  {
    question: "Puis-je commander un produit qui n'est pas dans votre catalogue ?",
    answer: "Absolument ! Grâce à notre réseau de fournisseurs, nous pouvons sourcer pratiquement n'importe quel produit professionnel. Utilisez notre formulaire de demande spéciale pour nous décrire ce que vous recherchez."
  },
  {
    question: "Proposez-vous des tarifs pour les grandes quantités ?",
    answer: "Oui, nous offrons des tarifs dégressifs pour les commandes en grande quantité. Plus votre commande est importante, plus les prix sont avantageux. Demandez un devis pour obtenir nos meilleures offres."
  }
];

export function FAQSection() {
  return (
    <>
      <FAQJsonLd items={faqItems} />
      
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-orange tracking-widest uppercase mb-2 block">
              FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus courantes de nos clients
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-orange py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
}
