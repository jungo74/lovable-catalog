import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Truck, HeartHandshake } from 'lucide-react';
import { seoConfig } from '@/types';

const values = [
  {
    icon: Award,
    title: 'Qualité',
    description: 'Nous sélectionnons rigoureusement nos fournisseurs pour vous garantir des produits de qualité professionnelle.',
  },
  {
    icon: Users,
    title: 'Proximité',
    description: 'Une équipe dédiée à votre écoute pour comprendre vos besoins et vous conseiller au mieux.',
  },
  {
    icon: Truck,
    title: 'Réactivité',
    description: 'Des délais de livraison optimisés et un suivi personnalisé de vos commandes.',
  },
  {
    icon: HeartHandshake,
    title: 'Partenariat',
    description: 'Nous construisons des relations durables avec nos clients, basées sur la confiance et la transparence.',
  },
];

const milestones = [
  { year: '2015', title: 'Création', description: 'Fondation de SWH NEGOCE avec une vision claire : simplifier les achats professionnels.' },
  { year: '2018', title: 'Expansion', description: 'Élargissement de notre gamme avec les vêtements de travail et équipements de sécurité.' },
  { year: '2021', title: 'Digitalisation', description: 'Lancement de notre plateforme en ligne pour faciliter vos demandes de devis.' },
  { year: '2024', title: 'Aujourd\'hui', description: 'Plus de 500 entreprises nous font confiance pour leurs achats professionnels.' },
];

const APropos = () => {
  return (
    <>
      <SEOHead
        title="À Propos"
        description={`Découvrez ${seoConfig.siteName}, votre partenaire de confiance pour les fournitures professionnelles. Notre histoire, nos valeurs et notre engagement qualité.`}
      />
      <main className="pt-20 pb-16 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange rounded-full text-sm font-medium mb-6">
                Notre Histoire
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                À Propos de <span className="text-orange">SWH</span> NEGOCE
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Depuis notre création, nous accompagnons les professionnels avec des solutions 
                adaptées à leurs besoins en fournitures, équipements et consommables.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Notre Mission */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-orange font-medium text-sm tracking-wide">NOTRE MISSION</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Simplifier vos achats professionnels
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Chez {seoConfig.siteName}, nous croyons que l'approvisionnement en fournitures 
                  professionnelles ne devrait jamais être un casse-tête. C'est pourquoi nous 
                  proposons un service personnalisé, des produits de qualité et des devis sur mesure.
                </p>
                <ul className="space-y-4">
                  {[
                    'Catalogue complet et diversifié',
                    'Devis personnalisés sous 24h',
                    'Conseils d\'experts',
                    'Livraison sur toute la France',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-foreground">
                      <CheckCircle className="h-5 w-5 text-orange flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-8 md:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                      <p className="text-4xl font-bold text-orange">500+</p>
                      <p className="text-muted-foreground mt-2">Clients satisfaits</p>
                    </div>
                    <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                      <p className="text-4xl font-bold text-orange">9+</p>
                      <p className="text-muted-foreground mt-2">Années d'expérience</p>
                    </div>
                    <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                      <p className="text-4xl font-bold text-orange">5000+</p>
                      <p className="text-muted-foreground mt-2">Références produits</p>
                    </div>
                    <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                      <p className="text-4xl font-bold text-orange">24h</p>
                      <p className="text-muted-foreground mt-2">Délai de réponse</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <span className="text-orange font-medium text-sm tracking-wide">NOS VALEURS</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Ce qui nous définit
              </h2>
              <p className="text-muted-foreground text-lg">
                Des engagements forts qui guident chacune de nos actions au quotidien.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-14 h-14 rounded-xl bg-orange/10 flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors">
                    <value.icon className="h-7 w-7 text-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <span className="text-orange font-medium text-sm tracking-wide">NOTRE PARCOURS</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Une histoire de croissance
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
                
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center gap-6 mb-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="bg-muted/50 rounded-xl p-6">
                        <span className="text-orange font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-semibold text-foreground mt-1">{milestone.title}</h3>
                        <p className="text-muted-foreground mt-2">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-orange border-4 border-background z-10" />
                    
                    <div className="hidden md:block flex-1" />
                    
                    {/* Mobile version */}
                    <div className="md:hidden pl-12">
                      <span className="text-orange font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Prêt à travailler ensemble ?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Contactez-nous pour discuter de vos besoins et recevoir un devis personnalisé.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-all hover:scale-105"
              >
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default APropos;
