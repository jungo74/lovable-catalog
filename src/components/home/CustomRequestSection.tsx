import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Truck, CheckCircle } from 'lucide-react';

export function CustomRequestSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-orange tracking-widest uppercase mb-4 block">
              Vous ne trouvez pas votre produit ?
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Nous Sourçons Pour Vous
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Grâce à notre réseau de fournisseurs étendu, <strong className="text-orange">SWH Distribution</strong> peut 
              vous procurer n'importe quel produit même s'il n'est pas dans notre catalogue. 
              Envoyez-nous votre demande avec une description ou une image du produit recherché.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Search, text: "Décrivez le produit recherché" },
                { icon: MessageSquare, text: "Joignez une photo ou un document si besoin" },
                { icon: Truck, text: "Nous sourçons et livrons rapidement" },
                { icon: CheckCircle, text: "Satisfaction garantie" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-orange" />
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/contact?custom=true"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange text-white rounded-lg font-semibold hover:bg-orange-dark transition-colors"
            >
              Faire une demande spéciale
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="Service de sourcing personnalisé"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Badge flottant */}
            <div className="absolute -bottom-6 -left-6 bg-orange text-white p-6 rounded-xl shadow-xl">
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm">Taux de satisfaction</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
