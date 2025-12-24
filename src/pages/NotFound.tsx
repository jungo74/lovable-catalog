import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEOHead } from "@/components/seo/SEOHead";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead 
        title="Page non trouvée" 
        description="La page que vous recherchez n'existe pas ou a été déplacée." 
      />
      <main className="flex min-h-screen items-center justify-center bg-muted/30 pt-20">
        <div className="text-center px-4">
          <h1 className="font-serif text-8xl md:text-9xl font-bold text-orange mb-4">404</h1>
          <p className="text-xl md:text-2xl font-semibold text-foreground mb-2">Page non trouvée</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors"
          >
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
