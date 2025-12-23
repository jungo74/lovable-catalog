import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { useQuoteStore } from '@/lib/store/quote-store';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const itemCount = useQuoteStore((state) => state.getItemCount());

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const headerBg = isScrolled || isMobileMenuOpen || !isHomePage
    ? 'bg-background/95 backdrop-blur-md shadow-sm'
    : 'bg-transparent';

  const textColor = isScrolled || !isHomePage
    ? 'text-foreground'
    : 'text-white';

  const navTextColor = isScrolled || !isHomePage
    ? 'text-foreground hover:text-primary'
    : 'text-white/90 hover:text-white';

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', headerBg)}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className={cn('font-serif text-xl md:text-2xl font-bold transition-colors', textColor)}
          >
            <span className="text-orange">SWH</span> Distribution
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isActive(link.href) ? 'text-orange' : navTextColor
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Demande de devis */}
            <Link
              to="/contact"
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all bg-orange text-white hover:bg-orange-dark"
            >
              <FileText className="h-4 w-4" />
              Demander un devis
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs bg-primary text-white rounded-full font-bold animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Bouton mobile */}
          <div className="flex items-center gap-3 md:hidden">
            {itemCount > 0 && (
              <Link
                to="/contact"
                className="relative flex items-center justify-center px-3 py-2 rounded-lg bg-orange text-white text-sm font-medium"
              >
                <FileText className="h-4 w-4 mr-1" />
                Devis
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 text-xs bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn('p-2 rounded-lg transition-colors', textColor)}
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive(link.href)
                      ? 'bg-orange text-white'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-orange text-white rounded-lg font-medium"
              >
                <FileText className="h-4 w-4" />
                Demander un devis
                {itemCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 text-xs bg-white text-orange rounded-full font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
