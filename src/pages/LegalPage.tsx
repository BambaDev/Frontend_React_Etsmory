import { motion } from "framer-motion";

function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Mentions légales</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Retrouvez ici les informations légales de notre site, conformes aux règles de la République de Côte d'Ivoire.
          </p>
        </motion.div>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Informations de l'éditeur</h2>
            <p>Le site EtSmory est édité par EtSmory SARL, immatriculée en Côte d'Ivoire.</p>
            <p>Siège social : Abidjan, Côte d'Ivoire.</p>
            <p>Numéro d'immatriculation : CI-12345678</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Directeur de publication</h2>
            <p>M. Jean Kouame, Directeur général.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Hébergeur</h2>
            <p>Hébergement : Vercel Inc., 340 S Lemon Ave, Walnut, CA 91789, États-Unis.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Propriété intellectuelle</h2>
            <p>Tous les contenus du site (textes, images, logos) sont la propriété d'EtSmory ou de ses partenaires. Toute reproduction non autorisée est interdite.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Responsabilité</h2>
            <p>EtSmory s'engage à fournir des informations exactes. Toutefois, la responsabilité ne saurait être engagée pour des erreurs ou omissions sur le site.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LegalPage;
