import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { seoConfig } from '@/types';

const MentionsLegales = () => {
  return (
    <>
      <SEOHead
        title="Mentions Légales"
        description={`Mentions légales de ${seoConfig.siteName}. Informations sur l'éditeur du site, l'hébergeur et les conditions d'utilisation.`}
      />
      <main className="pt-24 pb-16 min-h-screen bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Mentions Légales
            </h1>

            <div className="bg-background rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Éditeur du site
                </h2>
                <div className="text-muted-foreground space-y-2 pl-4">
                  <p><strong className="text-foreground">Raison sociale :</strong> {seoConfig.siteName}</p>
                  <p><strong className="text-foreground">Forme juridique :</strong> [À compléter]</p>
                  <p><strong className="text-foreground">Capital social :</strong> [À compléter]</p>
                  <p><strong className="text-foreground">SIRET :</strong> [À compléter]</p>
                  <p><strong className="text-foreground">RCS :</strong> [À compléter]</p>
                  <p><strong className="text-foreground">Numéro TVA :</strong> [À compléter]</p>
                  <p><strong className="text-foreground">Adresse :</strong> 123 Rue Exemple, 75001 Paris, France</p>
                  <p><strong className="text-foreground">Email :</strong> {seoConfig.ownerEmail}</p>
                  <p><strong className="text-foreground">Téléphone :</strong> +33 1 23 45 67 89</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Directeur de la publication
                </h2>
                <p className="text-muted-foreground pl-4">
                  [Nom du directeur de la publication]
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Hébergeur
                </h2>
                <div className="text-muted-foreground space-y-2 pl-4">
                  <p><strong className="text-foreground">Nom :</strong> Lovable / Supabase</p>
                  <p><strong className="text-foreground">Adresse :</strong> San Francisco, CA, États-Unis</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Propriété intellectuelle
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) 
                  est la propriété exclusive de {seoConfig.siteName}, à l'exception des marques, logos 
                  ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
                </p>
                <p className="text-muted-foreground pl-4 mt-4 leading-relaxed">
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication, 
                  même partielle, de ces différents éléments est strictement interdite sans l'accord exprès 
                  par écrit de {seoConfig.siteName}.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Limitations de responsabilité
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  {seoConfig.siteName} ne pourra être tenue responsable des dommages directs et indirects 
                  causés au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de 
                  l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de 
                  l'apparition d'un bug ou d'une incompatibilité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Droit applicable
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  Tout litige en relation avec l'utilisation du site {seoConfig.siteName} est soumis 
                  au droit français. L'utilisateur reconnaît la compétence exclusive des tribunaux 
                  compétents de Paris.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default MentionsLegales;
