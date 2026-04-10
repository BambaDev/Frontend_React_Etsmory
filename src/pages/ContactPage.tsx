import { useState } from "react";
import { Icons } from "../components/Icons";

// ─── ContactPage ──────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Contactez-nous</h1>
        <p className="text-gray-500 max-w-md mx-auto">Notre équipe est disponible 7j/7 de 7h à 22h pour répondre à toutes vos questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Informations de contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <Icons.MapPin />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Adresse</div>
                  <div className="text-sm text-gray-500">Abidjan, Côte d'Ivoire</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Icons.Phone />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Téléphone</div>
                  <div className="text-sm text-gray-500">+225 07 08 09 10 11</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Icons.Mail />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Email</div>
                  <div className="text-sm text-gray-500">contact@etsmory.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <Icons.Headphones />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Support</div>
                  <div className="text-sm text-gray-500">7j/7 de 7h à 22h</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-3">Commandez par WhatsApp</h3>
            <p className="mb-4 opacity-90">Pour une commande rapide et personnalisée, contactez-nous directement sur WhatsApp.</p>
            <a href="https://wa.me/2250708091011" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors">
              <Icons.WhatsApp /> Commander sur WhatsApp
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Message envoyé !</h3>
              <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" required value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                <input type="text" required value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} required value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none" />
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;