import { useState } from "react";
import { motion } from "framer-motion";

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "contact" | "about" | "signup" | "login" | "track" | "faq" | "support" | "terms" | "privacy" | "legal" | "account";

function Login({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs");
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
            <span className="text-4xl mb-4 block">🔐</span>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Se connecter</h1>
            <p className="text-gray-600">Bienvenue sur EtSmory</p>
          </div>

          {success ? (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center text-green-700">
              ✅ Connexion réussie ! Redirection en cours...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 rounded-lg p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

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
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-gray-600">Se souvenir de moi</span>
                </label>
                <button
                  type="button"
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-green-700 transition-all shadow-lg"
              >
                Se connecter
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Pas encore inscrit ?{" "}
            <button
              onClick={() => onNavigate("signup")}
              className="text-orange-600 font-semibold hover:text-orange-700"
            >
              Créer un compte
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;