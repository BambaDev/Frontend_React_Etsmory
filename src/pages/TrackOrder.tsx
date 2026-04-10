import { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";

function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setSearched(true);
    // Simuler une réponse serveur
    setTimeout(() => {
      setOrderData({
        number: trackingNumber,
        date: "5 avril 2026",
        total: "15 500 FCFA",
        status: "En livraison",
        estimatedDelivery: "Aujourd'hui avant 22h",
        items: [
          { name: "Œufs Frais (Dizaine)", qty: 2, price: "1 800 FCFA" },
          { name: "Riz local premium", qty: 1, price: "8 900 FCFA" },
          { name: "Huile de palme", qty: 1, price: "3 800 FCFA" }
        ],
        steps: [
          { label: "Commande confirmée", completed: true, date: "5 avril 14:30" },
          { label: "En préparation", completed: true, date: "5 avril 15:00" },
          { label: "En livraison", completed: true, date: "5 avril 20:00" },
          { label: "Livrée", completed: false, date: "Aujourd'hui avant 22h" }
        ]
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Suivre ma commande</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Entrez votre numéro de commande pour suivre l'état de votre livraison en temps réel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Ex: ESM123456 ou #ESM123456"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors whitespace-nowrap"
            >
              Suivre
            </button>
          </form>
        </motion.div>

        {searched && orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gray-600 text-sm">Numéro de commande</p>
                  <h2 className="text-2xl font-bold text-gray-800">#{orderData.number}</h2>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Total</p>
                  <p className="text-2xl font-bold text-orange-600">{orderData.total}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-gray-600 text-sm">Commandée le</p>
                  <p className="font-semibold text-gray-800">{orderData.date}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Livraison estimée</p>
                  <p className="font-semibold text-green-600">{orderData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Statut de livraison</h3>
              <div className="space-y-4">
                {orderData.steps.map((step: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          step.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.completed ? "✓" : index + 1}
                      </div>
                      {index < orderData.steps.length - 1 && (
                        <div
                          className={`w-1 h-12 mt-2 ${
                            step.completed ? "bg-green-100" : "bg-gray-100"
                          }`}
                        />
                      )}
                    </div>
                    <div className="py-2">
                      <p className="font-semibold text-gray-800">{step.label}</p>
                      <p className="text-sm text-gray-600">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Articles commandés</h3>
              <div className="space-y-3">
                {orderData.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantité: {item.qty}</p>
                    </div>
                    <p className="font-bold text-orange-600">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Besoin d'aide ?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                  <Icons.Phone className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-800">+225 07 00 00 00</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                  <Icons.Mail className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-800">support@etsmory.ci</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {searched && !orderData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-yellow-100 border border-yellow-400 rounded-2xl p-8 text-center text-yellow-700"
          >
            <p className="text-lg font-semibold">⚠️ Commande non trouvée</p>
            <p className="text-sm mt-2">Vérifiez votre numéro de commande et réessayez.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;