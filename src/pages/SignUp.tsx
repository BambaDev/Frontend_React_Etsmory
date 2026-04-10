import { useState } from "react";
import { motion } from "framer-motion";

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "contact" | "about" | "signup" | "login" | "track" | "faq" | "support" | "terms" | "privacy" | "legal" | "account";

function SignUp({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setSuccess(true);
    setTimeout(() => onNavigate("home"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <span className="text-4xl mb-4 block">🛒</span>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Créer un compte</h1>
            <p className="text-gray-600">Rejoignez EtSmory aujourd'hui</p>
          </div>

          {success ? (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center text-green-700">
              ✅ Inscription réussie ! Redirection en cours...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 rounded-lg p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Kouamé Assoua"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@exemple.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+225 07 00 00 00 00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-green-700 transition-all shadow-lg"
              >
                S'inscrire
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Déjà inscrit ?{" "}
            <button
              onClick={() => onNavigate("login")}
              className="text-orange-600 font-semibold hover:text-orange-700"
            >
              Se connecter
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;