import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { useQuoteStore } from '@/lib/store/quote-store';
import { Trash2, Send, CheckCircle, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const items = useQuoteStore((state) => state.items);
  const removeItem = useQuoteStore((state) => state.removeItem);
  const updateQuantity = useQuoteStore((state) => state.updateQuantity);
  const clearQuote = useQuoteStore((state) => state.clearQuote);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Bot detected
    if (!formData.name || !formData.email) {
      toast({ title: 'Erreur', description: 'Veuillez remplir tous les champs obligatoires.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    // Simulate API call
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
          <div className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h1 className="font-serif text-3xl font-bold mb-2">Demande envoyée !</h1>
            <p className="text-muted-foreground mb-6">Nous vous répondrons sous 24 heures.</p>
            <Link to="/" className="text-primary hover:underline">Retour à l'accueil</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Demande de Devis" description="Contactez-nous pour toute demande de devis. Remplissez le formulaire avec votre sélection de produits." canonical="/contact" />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Demande de Devis</h1>
            <p className="text-muted-foreground text-lg">Remplissez le formulaire avec votre sélection</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Sélection */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="font-serif text-xl font-semibold mb-4">Votre sélection ({items.length})</h2>
              {items.length === 0 ? (
                <p className="text-muted-foreground">Aucun produit sélectionné. <Link to="/products" className="text-primary hover:underline">Parcourir le catalogue</Link></p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between gap-4 p-3 bg-muted rounded-lg">
                      <div className="flex-1 min-w-0"><p className="font-medium truncate">{item.productName}</p></div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 rounded bg-background flex items-center justify-center"><Minus className="h-4 w-4" /></button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 rounded bg-background flex items-center justify-center"><Plus className="h-4 w-4" /></button>
                        <button onClick={() => removeItem(item.productId)} className="w-8 h-8 rounded bg-destructive/10 text-destructive flex items-center justify-center"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="honeypot" value={formData.honeypot} onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
              <div>
                <label htmlFor="name" className="block font-medium mb-2">Nom complet *</label>
                <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">Email *</label>
                <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="block font-medium mb-2">Message</label>
                <textarea id="message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="Précisions sur votre demande..." />
              </div>
              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50 transition-all">
                {loading ? 'Envoi...' : <><Send className="h-5 w-5" /> Envoyer la demande</>}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
