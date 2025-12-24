import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';
import { seoConfig } from '@/types';

const PolitiqueConfidentialite = () => {
  return (
    <>
      <SEOHead
        title="Politique de Confidentialité"
        description={`Politique de confidentialité de ${seoConfig.siteName}. Découvrez comment nous protégeons vos données personnelles.`}
      />
      <main className="pt-24 pb-16 min-h-screen bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Politique de Confidentialité
            </h1>

            <div className="bg-background rounded-2xl shadow-sm p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Introduction
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  Chez {seoConfig.siteName}, nous accordons une grande importance à la protection de 
                  vos données personnelles. Cette politique de confidentialité vous informe de la manière 
                  dont nous collectons, utilisons et protégeons vos informations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Données collectées
                </h2>
                <div className="text-muted-foreground pl-4 space-y-3">
                  <p className="leading-relaxed">Nous collectons les données suivantes :</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Nom et prénom (lors d'une demande de devis)</li>
                    <li>Adresse email professionnelle</li>
                    <li>Numéro de téléphone (optionnel)</li>
                    <li>Nom de l'entreprise</li>
                    <li>Détails de votre demande de devis</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Utilisation des données
                </h2>
                <div className="text-muted-foreground pl-4 space-y-3">
                  <p className="leading-relaxed">Vos données sont utilisées pour :</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Répondre à vos demandes de devis</li>
                    <li>Vous contacter concernant nos produits et services</li>
                    <li>Améliorer notre site et nos services</li>
                    <li>Respecter nos obligations légales</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Protection des données
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
                  appropriées pour protéger vos données personnelles contre tout accès, modification, 
                  divulgation ou destruction non autorisée.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Conservation des données
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  Vos données personnelles sont conservées pendant une durée de 3 ans à compter de 
                  votre dernier contact avec nous, sauf obligation légale de conservation plus longue.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Vos droits
                </h2>
                <div className="text-muted-foreground pl-4 space-y-3">
                  <p className="leading-relaxed">Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Droit d'accès à vos données</li>
                    <li>Droit de rectification</li>
                    <li>Droit à l'effacement</li>
                    <li>Droit à la limitation du traitement</li>
                    <li>Droit à la portabilité des données</li>
                    <li>Droit d'opposition</li>
                  </ul>
                  <p className="mt-4 leading-relaxed">
                    Pour exercer ces droits, contactez-nous à : {seoConfig.ownerEmail}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Cookies
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  Ce site utilise uniquement des cookies techniques essentiels au fonctionnement du site. 
                  Aucun cookie publicitaire ou de tracking tiers n'est utilisé.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-1 h-8 bg-orange rounded-full" />
                  Contact
                </h2>
                <p className="text-muted-foreground pl-4 leading-relaxed">
                  Pour toute question concernant cette politique de confidentialité, contactez-nous à : 
                  <a href={`mailto:${seoConfig.ownerEmail}`} className="text-orange hover:underline ml-1">
                    {seoConfig.ownerEmail}
                  </a>
                </p>
              </section>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Dernière mise à jour : Décembre 2024
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default PolitiqueConfidentialite;
