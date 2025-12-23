import { useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { useQuoteStore } from '@/lib/store/quote-store';
import { Trash2, Send, CheckCircle, Minus, Plus, Upload, X, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const isCustomRequest = searchParams.get('custom') === 'true';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const items = useQuoteStore((state) => state.items);
  const removeItem = useQuoteStore((state) => state.removeItem);
  const updateQuantity = useQuoteStore((state) => state.updateQuantity);
  const clearQuote = useQuoteStore((state) => state.clearQuote);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    ice: '',
    message: '',
    customRequest: '',
    honeypot: ''
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: 'Erreur', description: 'Le fichier ne doit pas dépasser 5 Mo.', variant: 'destructive' });
        return;
      }
      // Vérifier le type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({ title: 'Erreur', description: 'Type de fichier non autorisé. Utilisez JPG, PNG, PDF ou DOC.', variant: 'destructive' });
        return;
      }
      setAttachment(file);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Bot detected
    
    // Validation
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({ title: 'Erreur', description: 'Veuillez entrer un nom valide.', variant: 'destructive' });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: 'Erreur', description: 'Veuillez entrer un email valide.', variant: 'destructive' });
      return;
    }
    if (formData.phone && !/^[+]?[\d\s-]{8,}$/.test(formData.phone)) {
      toast({ title: 'Erreur', description: 'Numéro de téléphone invalide.', variant: 'destructive' });
      return;
    }
    if (formData.ice && !/^\d{14,15}$/.test(formData.ice.replace(/\s/g, ''))) {
      toast({ title: 'Erreur', description: 'L\'ICE doit contenir 14 ou 15 chiffres.', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    
    // Simuler l'envoi (à remplacer par votre API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccess(true);
    clearQuote();
    setLoading(false);
  };

  if (success) {
    return (
      <>
        <SEOHead title="Demande envoyée" description="Votre demande de devis a été envoyée avec succès." canonical="/contact" noIndex />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold mb-4">Demande envoyée !</h1>
            <p className="text-muted-foreground mb-8">
              Merci pour votre demande. Notre équipe vous contactera sous 24 heures avec un devis personnalisé.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Demande de Devis" 
        description="Contactez SWH Distribution pour toute demande de devis. Remplissez le formulaire avec votre sélection de produits." 
        canonical="/contact" 
      />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-orange tracking-widest uppercase mb-2 block">
              Demande de devis
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isCustomRequest ? 'Demande Spéciale' : 'Votre Panier'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {isCustomRequest 
                ? "Décrivez le produit que vous recherchez et nous vous fournirons un devis personnalisé"
                : "Vérifiez votre sélection et complétez vos informations pour recevoir un devis"
              }
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Sélection / Panier */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center text-sm font-bold">
                    {items.length}
                  </span>
                  Produits sélectionnés
                </h2>
                
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Aucun produit dans votre panier.</p>
                    <Link 
                      to="/products" 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-dark transition-colors"
                    >
                      Parcourir le catalogue
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.productId} className="flex items-center justify-between gap-4 p-4 bg-muted rounded-lg">
                        <div className="flex-1 min-w-0">
                          <Link to={`/products/${item.productSlug}`} className="font-medium text-foreground hover:text-orange truncate block">
                            {item.productName}
                          </Link>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                            className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                            className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => removeItem(item.productId)} 
                            className="w-8 h-8 rounded bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section demande spéciale */}
              <div className="bg-orange/10 border border-orange/30 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-orange">💡</span>
                  Vous ne trouvez pas votre produit ?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Décrivez le produit recherché ci-dessous et joignez une image si possible. 
                  Notre équipe sourcera le produit pour vous.
                </p>
                <textarea
                  value={formData.customRequest}
                  onChange={(e) => setFormData({ ...formData, customRequest: e.target.value })}
                  placeholder="Ex: Je recherche des gants de protection en nitrile taille L, boîte de 100..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none resize-none text-sm"
                />
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input 
                type="text" 
                name="honeypot" 
                value={formData.honeypot} 
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
              />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Nom complet *</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                    placeholder="+212 6XX XXX XXX"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" 
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Entreprise</label>
                  <input 
                    type="text" 
                    id="company" 
                    value={formData.company} 
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" 
                  />
                </div>
              </div>

              {/* Champ ICE */}
              <div>
                <label htmlFor="ice" className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  ICE (Identifiant Commun de l'Entreprise)
                </label>
                <input 
                  type="text" 
                  id="ice" 
                  value={formData.ice} 
                  onChange={(e) => setFormData({ ...formData, ice: e.target.value })} 
                  placeholder="000000000000000"
                  maxLength={15}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-mono" 
                />
                <p className="text-xs text-muted-foreground mt-1">15 chiffres - requis pour la facturation B2B</p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={3} 
                  value={formData.message} 
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none" 
                  placeholder="Précisions sur votre demande, délais souhaités, lieu de livraison..." 
                />
              </div>

              {/* Upload fichier */}
              <div>
                <label className="block text-sm font-medium mb-2">Pièce jointe (image ou document)</label>
                <div className="relative">
                  {attachment ? (
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange/20 flex items-center justify-center">
                          <Upload className="h-5 w-5 text-orange" />
                        </div>
                        <div>
                          <p className="font-medium text-sm truncate max-w-[200px]">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{(attachment.size / 1024).toFixed(0)} Ko</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={removeAttachment}
                        className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-orange hover:bg-orange/5 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Cliquez ou glissez un fichier ici</span>
                      <span className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF, DOC (max 5 Mo)</span>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/webp,application/pdf,.doc,.docx"
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading || (items.length === 0 && !formData.customRequest)} 
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Envoyer la demande de devis
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe commerciale.
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;