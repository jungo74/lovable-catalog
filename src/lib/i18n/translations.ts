export type Language = 'fr' | 'en' | 'ar';

export const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    products: 'Produits',
    contact: 'Contact',
    requestQuote: 'Demander un devis',
    
    // Products page
    ourCatalog: 'Notre Catalogue',
    catalogDescription: 'Découvrez notre sélection de produits professionnels de qualité',
    searchProduct: 'Rechercher un produit...',
    allProducts: 'Tous les produits',
    productsIn: 'produit(s) dans',
    noProductFound: 'Aucun produit trouvé',
    noProductDescription: "Nous n'avons pas trouvé de produit correspondant à votre recherche.",
    pageOf: 'Page {current} sur {total}',
    productsFound: '{count} produits trouvés',
    customService: 'Service sur mesure',
    productNotFound: 'Vous ne trouvez pas votre produit ?',
    productNotFoundDescription: 'Grâce à notre réseau de fournisseurs, SWH NEGOCE peut vous procurer n\'importe quel produit, même s\'il n\'est pas dans notre catalogue.',
    makeSpecialRequest: 'Faire une demande spéciale',
    
    // Product detail
    addToQuote: 'Ajouter au devis',
    addedToQuote: 'Produit ajouté au devis',
    downloadDatasheet: 'Télécharger la fiche technique',
    category: 'Catégorie',
    characteristics: 'Caractéristiques',
    technicalSpecs: 'Spécifications techniques',
    
    // Contact
    contactUs: 'Contactez-nous',
    sendMessage: 'Envoyer le message',
    messageSent: 'Message envoyé avec succès',
    messageError: 'Erreur lors de l\'envoi du message',
    
    // General
    loading: 'Chargement...',
    error: 'Erreur',
    previous: 'Précédent',
    next: 'Suivant',
    gridView: 'Vue grille',
    listView: 'Vue liste',
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    contact: 'Contact',
    requestQuote: 'Request a Quote',
    
    // Products page
    ourCatalog: 'Our Catalog',
    catalogDescription: 'Discover our selection of quality professional products',
    searchProduct: 'Search for a product...',
    allProducts: 'All products',
    productsIn: 'product(s) in',
    noProductFound: 'No product found',
    noProductDescription: "We couldn't find any product matching your search.",
    pageOf: 'Page {current} of {total}',
    productsFound: '{count} products found',
    customService: 'Custom service',
    productNotFound: "Can't find your product?",
    productNotFoundDescription: 'Thanks to our network of suppliers, SWH NEGOCE can provide you with any product, even if it is not in our catalog.',
    makeSpecialRequest: 'Make a special request',
    
    // Product detail
    addToQuote: 'Add to quote',
    addedToQuote: 'Product added to quote',
    downloadDatasheet: 'Download datasheet',
    category: 'Category',
    characteristics: 'Characteristics',
    technicalSpecs: 'Technical specifications',
    
    // Contact
    contactUs: 'Contact us',
    sendMessage: 'Send message',
    messageSent: 'Message sent successfully',
    messageError: 'Error sending message',
    
    // General
    loading: 'Loading...',
    error: 'Error',
    previous: 'Previous',
    next: 'Next',
    gridView: 'Grid view',
    listView: 'List view',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    contact: 'اتصل بنا',
    requestQuote: 'طلب عرض أسعار',
    
    // Products page
    ourCatalog: 'كتالوجنا',
    catalogDescription: 'اكتشف مجموعتنا من المنتجات المهنية عالية الجودة',
    searchProduct: 'البحث عن منتج...',
    allProducts: 'جميع المنتجات',
    productsIn: 'منتج(ات) في',
    noProductFound: 'لم يتم العثور على منتج',
    noProductDescription: 'لم نتمكن من العثور على منتج يطابق بحثك.',
    pageOf: 'الصفحة {current} من {total}',
    productsFound: '{count} منتجات موجودة',
    customService: 'خدمة مخصصة',
    productNotFound: 'لم تجد منتجك؟',
    productNotFoundDescription: 'بفضل شبكة موردينا، يمكن لـ SWH NEGOCE أن توفر لك أي منتج، حتى لو لم يكن في كتالوجنا.',
    makeSpecialRequest: 'تقديم طلب خاص',
    
    // Product detail
    addToQuote: 'إضافة للعرض',
    addedToQuote: 'تمت إضافة المنتج للعرض',
    downloadDatasheet: 'تحميل الورقة الفنية',
    category: 'الفئة',
    characteristics: 'الخصائص',
    technicalSpecs: 'المواصفات الفنية',
    
    // Contact
    contactUs: 'اتصل بنا',
    sendMessage: 'إرسال الرسالة',
    messageSent: 'تم إرسال الرسالة بنجاح',
    messageError: 'حدث خطأ أثناء إرسال الرسالة',
    
    // General
    loading: 'جاري التحميل...',
    error: 'خطأ',
    previous: 'السابق',
    next: 'التالي',
    gridView: 'عرض الشبكة',
    listView: 'عرض القائمة',
  },
};

export const languageNames: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
};

export const languageFlags: Record<Language, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  ar: '🇸🇦',
};
