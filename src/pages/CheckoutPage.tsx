import { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string | null;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "contact";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatFCFA(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

function CheckoutPage({ cart, onNavigate, onClearCart }: {
  cart: CartItem[]; onNavigate: (p: Page) => void; onClearCart: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "Abidjan", commune: "", payment: "orange-money", notes: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = total >= 10000 ? 0 : 1500;

  const handleOrder = () => {
    setOrderPlaced(true);
    onClearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-3">Commande Confirmée ! 🎉</h1>
          <p className="text-gray-500 mb-4">Merci pour votre commande. Vous recevrez une confirmation par SMS sous peu.</p>
          <div className="bg-orange-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-orange-700 font-medium">Numéro de commande: <strong>#ESM{Date.now().toString().slice(-6)}</strong></p>
            <p className="text-sm text-orange-700 mt-1">Livraison estimée: <strong>Aujourd'hui ou demain avant 22h</strong></p>
          </div>
          <button onClick={() => onNavigate("home")} className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
            Retour à l'accueil
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Finaliser la commande</h1>
      <div className="flex items-center gap-2 mb-8">
        {[{ n: 1, l: "Livraison" }, { n: 2, l: "Paiement" }, { n: 3, l: "Confirmation" }].map((s) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s.n ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"}`}>{s.n}</div>
            <span className={`text-sm font-medium hidden sm:block ${step >= s.n ? "text-orange-600" : "text-gray-400"}`}>{s.l}</span>
            {s.n < 3 && <div className={`flex-1 h-1 rounded w-8 lg:w-16 ${step > s.n ? "bg-orange-400" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2"><Icons.Truck /> Informations de livraison</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Kouamé Assoua"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+225 07 00 00 00 00"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@exemple.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                    <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:outline-none transition-colors">
                      <option>Abidjan</option>
                      <option>Bouaké</option>
                      <option>Daloa</option>
                      <option>Korhogo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commune *</label>
                    <select value={form.commune} onChange={(e) => setForm({ ...form, commune: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:outline-none transition-colors">
                      <option value="">Choisir une commune</option>
                      {["Cocody", "Yopougon", "Adjamé", "Plateau", "Marcory", "Treichville", "Koumassi", "Abobo", "Attécoubé", "Portbouët"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse précise *</label>
                  <input type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Rue, quartier, point de repère..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions spéciales</label>
                  <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Instructions pour le livreur..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:outline-none transition-colors resize-none" />
                </div>
                <button onClick={() => setStep(2)} className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
                  Continuer vers le paiement →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2"><Icons.CreditCard /> Mode de paiement</h2>
              <div className="space-y-3">
                {[
                  { id: "orange-money", label: "Orange Money", emoji: "🟠", desc: "Paiement via Orange Money CI" },
                  { id: "mtn-money", label: "MTN Mobile Money", emoji: "🟡", desc: "Paiement via MTN MoMo" },
                  { id: "moov-money", label: "Moov Money", emoji: "🔵", desc: "Paiement via Moov Money" },
                  { id: "wave", label: "Wave", emoji: "🌊", desc: "Paiement via Wave" },
                  { id: "cash", label: "Paiement à la livraison", emoji: "💵", desc: "Payez en espèces à la réception" },
                ].map((p) => (
                  <label key={p.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.payment === p.id ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                    <input type="radio" name="payment" value={p.id} checked={form.payment === p.id} onChange={() => setForm({ ...form, payment: p.id })} className="accent-orange-500" />
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{p.label}</p>
                      <p className="text-xs text-gray-500">{p.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">← Retour</button>
                <button onClick={() => setStep(3)} className="flex-1 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">Vérifier la commande →</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2"><Icons.CheckCircle /> Confirmer la commande</h2>
              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-sm text-gray-800 mb-2">📍 Livraison</h3>
                  <p className="text-sm text-gray-600">{form.name} · {form.phone}</p>
                  <p className="text-sm text-gray-600">{form.address}, {form.commune}, {form.city}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-sm text-gray-800 mb-2">💳 Paiement</h3>
                  <p className="text-sm text-gray-600 capitalize">{form.payment.replace("-", " ")}</p>
                </div>
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-800 whitespace-nowrap">{formatFCFA(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">← Retour</button>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handleOrder}
                  className="flex-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-green-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-green-700 transition-all shadow-lg">
                  ✅ Confirmer et payer
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4">Récapitulatif ({cart.reduce((s, i) => s + i.quantity, 0)} articles)</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-2 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-800 whitespace-nowrap">{formatFCFA(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Sous-total</span><span>{formatFCFA(total)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Livraison</span>
                <span className={delivery === 0 ? "text-green-600" : ""}>{delivery === 0 ? "Gratuite 🎉" : formatFCFA(delivery)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-orange-600">{formatFCFA(total + delivery)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;