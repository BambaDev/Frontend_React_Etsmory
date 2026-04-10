import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqs = [
    {
      question: "Comment puis-je placer une commande ?",
      answer: "Vous pouvez parcourir nos produits dans la section Boutique, ajouter les articles à votre panier, puis procéder au paiement. Vous devrez entrer vos informations de livraison et choisir votre mode de paiement préféré."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons Orange Money, MTN Mobile Money, Moov Money, Wave, et le paiement à la livraison (espèces). Tous nos paiements sont sécurisés et cryptés."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Pour Abidjan, la livraison est généralement effectuée le même jour ou le jour suivant avant 22h. Les frais de livraison sont gratuits à partir de 10 000 FCFA."
    },
    {
      question: "Puis-je suivre ma commande ?",
      answer: "Oui ! Vous pouvez suivre votre commande en temps réel via la page 'Suivre ma commande' en utilisant votre numéro de commande."
    },
    {
      question: "Comment puis-je retourner un produit ?",
      answer: "Nous offrons une garantie de satisfaction de 30 jours. Si un produit n'est pas frais ou conforme, contactez-nous et nous l'échangerons ou vous rembourserons."
    },
    {
      question: "Quels sont les horaires de support client ?",
      answer: "Notre équipe support est disponible 24h/24, 7j/7. Vous pouvez nous contacter par téléphone, email, ou WhatsApp à tout moment."
    },
    {
      question: "Livrez-vous dans d'autres villes ?",
      answer: "Pour l'instant, nous livrons à Abidjan. Nous prévoyons d'étendre nos services à Bouaké et Daloa très bientôt. Inscrivez-vous pour être notifié."
    },
    {
      question: "Comment puis-je obtenir une facture ?",
      answer: "Une facture est automatiquement générée avec chaque commande et envoyée à votre email. Vous pouvez aussi la télécharger depuis votre compte client."
    },
    {
      question: "Y a-t-il une application mobile ?",
      answer: "Notre application mobile pour iOS et Android sera bientôt disponible. En attendant, notre site est entièrement optimisé pour mobile."
    },
    {
      question: "Comment puis-je devenir partenaire ou vendeur ?",
      answer: "Si vous êtes producteur ou commerçant, nous serions heureux de collaborer ! Contactez-nous à partners@etsmory.ci pour discuter des opportunités."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Questions Fréquemment Posées</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trouvez les réponses aux questions les plus courantes sur EtSmory et nos services.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full flex items-start justify-between p-6 hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-gray-800 pr-4 text-sm md:text-base">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: expanded === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-1"
                >
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {expanded === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-100"
                  >
                    <p className="p-6 text-gray-600 text-sm md:text-base">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-green-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="mb-6 opacity-90">Contactez notre équipe support disponible 24h/24, 7j/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+22507000000"
              className="px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors"
            >
              📞 Appeler
            </a>
            <a
              href="mailto:support@etsmory.ci"
              className="px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors"
            >
              📧 Email
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;