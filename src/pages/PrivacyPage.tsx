import { motion } from "framer-motion";

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Politique de confidentialité</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nous protégeons vos données personnelles et respectons les réglementations en vigueur en Côte d'Ivoire.
          </p>
        </motion.div>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Collecte de données</h2>
            <p>Nous collectons les informations nécessaires pour traiter vos commandes et améliorer votre expérience : nom, adresse, email, téléphone et détails de livraison.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Utilisation des données</h2>
            <p>Vos données sont utilisées pour le traitement des commandes, la communication clientèle et l'amélioration du site. Nous ne partageons pas vos informations avec des tiers sans votre consentement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Sécurité</h2>
            <p>Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
            <p>Le site utilise des cookies pour améliorer la navigation et mémoriser vos préférences. Vous pouvez gérer vos cookies depuis votre navigateur.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Droits des utilisateurs</h2>
            <p>Vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant à support@etsmory.ci.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
