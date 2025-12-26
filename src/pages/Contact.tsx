import { useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { useQuoteStore } from '@/lib/store/quote-store';
import { Trash2, Send, CheckCircle, Minus, Plus, Upload, X, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { seoConfig } from '@/types';
import { motion } from 'framer-motion';

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
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: 'Erreur', description: 'Chaque fichier ne doit pas dépasser 10 Mo.', variant: 'destructive' });
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({ title: 'Erreur', description: 'Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou PDF.', variant: 'destructive' });
        return;
      }
    }
    
    if (attachments.length + files.length > 5) {
      toast({ title: 'Erreur', description: 'Maximum 5 fichiers autorisés.', variant: 'destructive' });
      return;
    }
    
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({ title: 'Erreur', description: 'Veuillez entrer un nom valide.', variant: 'destructive' });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: 'Erreur', description: 'Veuillez entrer un email valide.', variant: 'destructive' });
      return;
    }
    if (!formData.message.trim()) {
      toast({ title: 'Erreur', description: 'Veuillez entrer votre message.', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccess(true);
    clearQuote();
    setLoading(false);
  };

  if (success) {
    return (
      <>
        <SEOHead title="Demande envoyée" description="Votre demande de devis a été envoyée avec succès." />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-muted/50 to-secondary/30 dark:from-background dark:via-muted/20 dark:to-background">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 max-w-md bg-card rounded-2xl shadow-xl border border-border"
          >
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
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
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Demande de Devis" 
        description="Contactez SWH Négoce pour toute demande de devis. Remplissez le formulaire et nous vous répondrons sous 24h." 
      />
      <main className="pt-24 pb-20 min-h-screen bg-gradient-to-br from-secondary via-muted/50 to-secondary/30 dark:from-background dark:via-muted/20 dark:to-background">
        <div className="container mx-auto px-4">
          {/* En-tête de page */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Demander un Devis Gratuit
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sélectionnez vos produits et recevez une offre personnalisée sous 24h. Service 100% gratuit et sans engagement.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Formulaire - 2/3 */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Nom Complet *</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        placeholder="Jean Dupont"
                        required 
                        className="w-full px-4 py-3.5 rounded-lg border border-input bg-background focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Adresse Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        placeholder="jean@entreprise.com"
                        required 
                        className="w-full px-4 py-3.5 rounded-lg border border-input bg-background focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                        placeholder="+212 6 12 34 56 78"
                        className="w-full px-4 py-3.5 rounded-lg border border-input bg-background focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">Nom de l'Entreprise</label>
                      <input 
                        type="text" 
                        id="company" 
                        value={formData.company} 
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                        placeholder="Votre Entreprise SARL"
                        className="w-full px-4 py-3.5 rounded-lg border border-input bg-background focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Votre Message *</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      className="w-full px-4 py-3.5 rounded-lg border border-input bg-background focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none resize-none transition-all" 
                      placeholder="Décrivez vos besoins en détail..." 
                      required
                    />
                  </div>

                  {/* Produits sélectionnés */}
                  {items.length > 0 && (
                    <div className="bg-muted/50 rounded-xl p-5">
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange text-white flex items-center justify-center text-xs font-bold">
                          {items.length}
                        </span>
                        Produits dans votre sélection
                      </h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-4 p-3 bg-background rounded-xl border border-border">
                            {/* Image du produit */}
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img 
                                src={item.productImage || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=100&q=80'} 
                                alt={item.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link to={`/products/${item.productSlug}`} className="text-sm font-semibold text-foreground hover:text-orange transition-colors line-clamp-1">
                                {item.productName}
                              </Link>
                              <div className="flex items-center gap-2 mt-2">
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                                  className="w-7 h-7 rounded bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button 
                                  type="button"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                                  className="w-7 h-7 rounded bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeItem(item.productId)} 
                              className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload fichiers */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Pièces Jointes (Optionnel)</label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Joignez des images ou fichiers PDF (max 5 fichiers, 10Mo chacun)
                    </p>
                    
                    {attachments.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                            <button 
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="w-7 h-7 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {attachments.length < 5 && (
                      <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-orange hover:bg-orange/5 transition-all">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium text-foreground">Cliquez pour télécharger</span>
                        <span className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP, PDF</span>
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          onChange={handleFileChange}
                          accept="image/jpeg,image/png,image/webp,application/pdf"
                          multiple
                          className="hidden" 
                        />
                      </label>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                        Envoyer le Message
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar Contact Info - 1/3 */}
            <div className="lg:sticky lg:top-28 space-y-5 h-fit">
              {/* Carte entreprise */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 shadow-lg"
              >
                <h2 className="font-serif text-xl font-bold mb-2">SWH Négoce</h2>
                <p className="text-primary-foreground/80 text-sm mb-5">
                  Votre partenaire de confiance pour toutes vos fournitures professionnelles au Maroc.
                </p>
                <div className="flex items-center gap-3 px-4 py-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                  <span className="text-primary-foreground/60 text-sm">ICE</span>
                  <span className="font-mono font-semibold tracking-wide">{seoConfig.ice}</span>
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.a 
                href={`https://wa.me/${seoConfig.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-4 p-5 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-white/80 text-sm">Réponse instantanée</p>
                </div>
              </motion.a>

              {/* Téléphone */}
              <motion.a 
                href={`tel:${seoConfig.ownerPhone.replace(/\s/g, '')}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-5 bg-background border border-border rounded-2xl hover:border-orange/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{seoConfig.ownerPhone}</p>
                  <p className="text-muted-foreground text-sm">Lun-Ven, 8h00 - 18h00</p>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a 
                href={`mailto:${seoConfig.ownerEmail}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-4 p-5 bg-background border border-border rounded-2xl hover:border-orange/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{seoConfig.ownerEmail}</p>
                  <p className="text-muted-foreground text-sm">Réponse sous 24h</p>
                </div>
              </motion.a>

              {/* Adresse */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 p-5 bg-background border border-border rounded-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Notre Adresse</p>
                  <p className="text-muted-foreground text-sm">{seoConfig.address}</p>
                </div>
              </motion.div>

              {/* Horaires */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="p-5 bg-background border border-border rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">Horaires d'Ouverture</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lundi - Vendredi</span>
                    <span className="font-medium">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samedi</span>
                    <span className="font-medium">9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimanche</span>
                    <span className="font-medium text-destructive">Fermé</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
