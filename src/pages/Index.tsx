import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { CustomRequestSection } from '@/components/home/CustomRequestSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';

const Index = () => {
  return (
    <>
      <SEOHead
        title="Accueil"
        description="SWH Négoce - Votre partenaire de confiance pour produits d'hygiène, vêtements de travail et matériel informatique au Maroc. Demandez un devis gratuit."
      />
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      
      <main>
        <HeroCarousel />
        <CategoriesSection />
        <CustomRequestSection />
        <ProcessSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
