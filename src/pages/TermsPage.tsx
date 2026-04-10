import { motion } from "framer-motion";

function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Conditions générales de vente</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Ces conditions générales régissent l'utilisation du site EtSmory et les ventes de produits en ligne en Côte d'Ivoire.
          </p>
        </motion.div>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Objet</h2>
            <p>Les présentes conditions définissent les droits et obligations des parties dans le cadre de la vente de produits sur le site EtSmory.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Commande</h2>
            <p>La commande est validée après le paiement. Vous recevrez une confirmation par email. Nous livrons principalement à Abidjan et dans les villes couvertes par notre service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Prix et paiement</h2>
            <p>Les prix sont indiqués en FCFA toutes taxes comprises. Les modes de paiement acceptés sont Orange Money, MTN Mobile Money, Moov Money, Wave et paiement à la livraison.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Livraison</h2>
            <p>La livraison est gratuite à partir de 10 000 FCFA. Les délais sont indiqués sur la page de commande et peuvent varier selon la disponibilité des produits.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Droit de rétractation</h2>
            <p>Vous disposez d'un délai de 14 jours pour demander un échange ou un remboursement si le produit n'est pas conforme ou présente un défaut.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Responsabilité</h2>
            <p>EtSmory s'engage à respecter les normes ivoiriennes de qualité et d'hygiène. Notre responsabilité est limitée aux produits vendus sur le site et aux informations fournies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Loi applicable</h2>
            <p>Ces conditions sont régies par le droit ivoirien, notamment le Code du Commerce de Côte d'Ivoire.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
