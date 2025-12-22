import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { seoConfig } from '@/types';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Colonne 1 - À propos */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              {seoConfig.siteName}
            </h3>
            <p className="text-background/70 text-sm leading-relaxed mb-4">
              Découvrez notre catalogue de produits de qualité. 
              Nous vous accompagnons dans tous vos projets.
            </p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-background/70 hover:text-background transition-colors text-sm">
                Accueil
              </Link>
              <Link to="/products" className="text-background/70 hover:text-background transition-colors text-sm">
                Catalogue Produits
              </Link>
              <Link to="/contact" className="text-background/70 hover:text-background transition-colors text-sm">
                Demande de Devis
              </Link>
            </nav>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a 
                href={`mailto:${seoConfig.ownerEmail}`}
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                {seoConfig.ownerEmail}
              </a>
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +33 1 23 45 67 89
              </div>
              <div className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                123 Rue Exemple, 75001 Paris
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} {seoConfig.siteName}. Tous droits réservés.
            </p>
            <div className="flex gap-4 text-sm">
              <Link to="/mentions-legales" className="text-background/60 hover:text-background transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-background/60 hover:text-background transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
