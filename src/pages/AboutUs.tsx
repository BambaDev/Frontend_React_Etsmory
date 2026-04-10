import { motion } from "framer-motion";
import { Icons } from "../components/Icons";

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "contact" | "about" | "signup" | "login" | "track" | "faq" | "support" | "terms" | "privacy" | "legal" | "account";

function AboutUs({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            À propos d'EtSmory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl opacity-90 max-w-2xl mx-auto"
          >
            Votre supermarché en ligne de confiance en Côte d'Ivoire, offrant des produits frais et locaux directement à votre porte.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-4">
                Fondée en 2020, EtSmory est née de la volonté de rendre les courses quotidiennes plus simples et plus accessibles pour les familles ivoiriennes. Nous avons commencé comme une petite épicerie locale et avons grandi grâce à la confiance de nos clients.
              </p>
              <p className="text-gray-600 mb-4">
                Aujourd'hui, nous sommes fiers de proposer une sélection rigoureuse de produits frais, locaux et importés, livrés directement à domicile dans toute l'Abidjan et bientôt dans d'autres villes de Côte d'Ivoire.
              </p>
              <p className="text-gray-600">
                Notre mission : offrir une expérience d'achat exceptionnelle tout en soutenant les producteurs locaux et en promouvant une alimentation saine et durable.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                alt="Notre équipe"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Icons.Shield,
                title: "Qualité",
                description: "Nous sélectionnons rigoureusement chaque produit pour garantir fraîcheur et qualité."
              },
              {
                icon: Icons.Truck,
                title: "Fiabilité",
                description: "Livraison ponctuelle et service client disponible 7j/7."
              },
              {
                icon: Icons.Leaf,
                title: "Durabilité",
                description: "Soutien aux producteurs locaux et pratiques respectueuses de l'environnement."
              },
              {
                icon: Icons.Heart,
                title: "Communauté",
                description: "Nous contribuons au développement économique local et social."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon filled={false} className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">EtSmory en Chiffres</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Clients satisfaits" },
              { number: "10,000+", label: "Produits disponibles" },
              { number: "99%", label: "Taux de satisfaction" },
              { number: "24/7", label: "Support client" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Équipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une équipe passionnée dédiée à votre satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kouamé Assoua",
                role: "Fondateur & CEO",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Marie Koné",
                role: "Directrice Commerciale",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Jean-Baptiste Yao",
                role: "Responsable Logistique",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-orange-600 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Rejoignez la communauté EtSmory</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Découvrez nos produits frais et faites vos courses en ligne dès aujourd'hui !
            </p>
            <button
              onClick={() => onNavigate("shop")}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
            >
              Commencer mes courses →
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;