import { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";

function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Aide & Support</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Notre équipe client est là pour vous aider avec vos commandes, votre compte et vos produits.
            Nous respectons les normes ivoiriennes et garantissons un service clair, rapide et adapté à Abidjan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact rapide</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <Icons.Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-semibold text-gray-800">+225 07 08 09 10 11</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <Icons.Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">support@etsmory.ci</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Icons.MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="font-semibold text-gray-800">Abidjan, Côte d'Ivoire</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Assistance client ivoirienne</h2>
            <p className="text-gray-100 leading-relaxed mb-6">
              Chez EtSmory, nous suivons les pratiques commerciales de Côte d'Ivoire : service local, paiement mobile et livraison dans les meilleures conditions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center">1</span>
                <p>Support disponible 7j/7 de 7h à 22h.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center">2</span>
                <p>Réponse rapide pour réclamations produits frais et livraison.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center">3</span>
                <p>Conseils personnalisés pour vos courses quotidiennes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Envoyez-nous votre demande</h2>
          {sent ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-green-600">
                <Icons.Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Message envoyé !</h3>
              <p className="text-gray-500">Nous revenons vers vous très rapidement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <input
                  type="text"
                  required
                  placeholder="Nom complet"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <input
                  type="tel"
                  required
                  placeholder="Téléphone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  required
                  placeholder="Objet"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <textarea
                rows={5}
                required
                placeholder="Détails de votre demande"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-full font-bold hover:bg-orange-600 transition-colors">
                Envoyer ma demande
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
