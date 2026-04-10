import { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";

function AccountPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [profile, setProfile] = useState({
    name: "Kouamé Assoua",
    email: "kouame.assoua@example.ci",
    phone: "+225 07 00 00 00 00",
  });
  const [address, setAddress] = useState({
    street: "Zone 4, Rue des Jardins",
    city: "Abidjan",
    zip: "22500",
    country: "Côte d'Ivoire",
  });

  const orders = [
    { id: "ESM-20260401-01", date: "1 avril 2026", status: "Livrée", total: "12 450 FCFA" },
    { id: "ESM-20260329-15", date: "29 mars 2026", status: "En préparation", total: "8 900 FCFA" },
    { id: "ESM-20260325-08", date: "25 mars 2026", status: "Livrée", total: "15 300 FCFA" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-orange-600 font-semibold">Mon compte</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3">Paramètres du compte</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">Gérez vos informations personnelles, vos commandes, vos adresses et vos préférences de paiement.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <p className="text-sm text-gray-500">Commandes</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{orders.length}</p>
              </div>
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <p className="text-sm text-gray-500">Total dépensé</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">65 650 FCFA</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-8">
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-1 mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Menu du compte</p>
              <h2 className="text-xl font-semibold text-gray-900">Navigation</h2>
            </div>
            <div className="space-y-2">
              {[
                { key: "account", label: "Informations personnelles" },
                { key: "orders", label: "Mes commandes" },
                { key: "address", label: "Adresses" },
                { key: "payment", label: "Paiement" },
                { key: "security", label: "Sécurité" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full text-left rounded-2xl px-4 py-3 transition-colors ${activeTab === tab.key ? "bg-orange-50 text-orange-600 shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.aside>

          <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {activeTab === "account" && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Informations personnelles</h3>
                    <p className="text-gray-600 mt-1">Mettez à jour vos informations de contact.</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
                    <Icons.Check className="w-4 h-4" /> Enregistrer
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-gray-700">Nom complet</span>
                    <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-gray-700">Email</span>
                    <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    <span className="font-medium text-gray-700">Téléphone</span>
                    <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                  </label>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Mes commandes</h3>
                    <p className="text-gray-600 mt-1">Consultez l'historique de vos dernières commandes.</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors">
                    Actualiser
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-3xl border border-gray-200 p-6 sm:flex sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Commande</p>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-semibold text-gray-900">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Montant</p>
                        <p className="font-semibold text-gray-900">{order.total}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Statut</p>
                        <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${order.status === "Livrée" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "address" && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Adresses</h3>
                    <p className="text-gray-600 mt-1">Gérez vos adresses de livraison.</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
                    Ajouter une adresse
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-3xl border border-gray-200 p-6">
                    <p className="text-sm text-gray-500">Adresse principale</p>
                    <h4 className="font-semibold text-gray-900 mt-3">{address.street}</h4>
                    <p className="text-gray-600 mt-1">{address.city}, {address.zip}</p>
                    <p className="text-gray-600">{address.country}</p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 p-6">
                    <label className="text-sm text-gray-700">Rue</label>
                    <input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="mt-2 w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                    <label className="text-sm text-gray-700 mt-4 block">Ville</label>
                    <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="mt-2 w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <label className="text-sm text-gray-700">
                        Code postal
                        <input value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className="mt-2 w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                      </label>
                      <label className="text-sm text-gray-700">
                        Pays
                        <input value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} className="mt-2 w-full rounded-3xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-500" />
                      </label>
                    </div>
                    <button className="mt-6 w-full rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">Enregistrer</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Méthodes de paiement</h3>
                    <p className="text-gray-600 mt-1">Gérez vos cartes et options de paiement.</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
                    <Icons.Plus className="w-4 h-4" /> Ajouter une carte
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Carte principale", card: "Visa •••• 1234", expiry: "12/28" },
                    { label: "Carte secondaire", card: "Mastercard •••• 5678", expiry: "09/27" },
                  ].map((item) => (
                    <div key={item.card} className="rounded-3xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-semibold text-gray-900 mt-2">{item.card}</p>
                        <p className="text-sm text-gray-500 mt-1">Exp: {item.expiry}</p>
                      </div>
                      <button className="rounded-full border border-orange-500 px-5 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors">Modifier</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Sécurité du compte</h3>
                    <p className="text-gray-600 mt-1">Mettez à jour votre mot de passe et les paramètres de connexion.</p>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
                    Modifier le mot de passe
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-3xl border border-gray-200 p-6">
                    <p className="text-sm text-gray-500">Dernière connexion</p>
                    <p className="text-gray-900 font-semibold mt-2">7 avril 2026 - 11:42</p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 p-6">
                    <p className="text-sm text-gray-500">Authentification à deux facteurs</p>
                    <p className="font-semibold text-gray-900 mt-2">Désactivée</p>
                    <button className="mt-4 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">Activer</button>
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
