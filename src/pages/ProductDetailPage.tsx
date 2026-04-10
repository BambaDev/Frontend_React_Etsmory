import { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "../components/Icons";
import { allProducts } from "../data/products";

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

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "contact";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatFCFA(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

function badgeClass(badge: string) {
  const classes = {
    "Frais": "bg-green-100 text-green-600",
    "Bio": "bg-green-100 text-green-600",
    "Local": "bg-orange-100 text-orange-600",
    "Promo": "bg-red-100 text-red-600",
    "Premium": "bg-purple-100 text-purple-600",
    "Saison": "bg-yellow-100 text-yellow-600",
    "Best": "bg-blue-100 text-blue-600",
    "Congelé": "bg-cyan-100 text-cyan-600",
    "Essentiel": "bg-gray-100 text-gray-600",
  };
  return classes[badge as keyof typeof classes] || "bg-gray-100 text-gray-600";
}

// ─── ProductCard ──────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, onViewProduct }: {
  product: Product; onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void; isWishlisted: boolean;
  onViewProduct: (p: Product) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden bg-gray-50">
        <img src={product.image} alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          onClick={() => onViewProduct(product)} />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg ${badgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">-{discount}%</span>
        )}
        <button onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isWishlisted ? "bg-red-50 text-red-500" : "bg-white/90 text-gray-400 hover:text-red-500"} shadow-sm`}>
          <Icons.Heart filled={isWishlisted} />
        </button>
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => onAddToCart(product)}
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-1">
              <Icons.Cart /> Ajouter
            </motion.button>
            <button onClick={() => onViewProduct(product)}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-orange-500 shadow">
              <Icons.Eye />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 cursor-pointer" onClick={() => onViewProduct(product)}>
        <span className="text-xs text-orange-600 font-medium">{product.category}</span>
        <h3 className="font-semibold text-sm text-gray-800 mt-1 mb-2 line-clamp-2 h-10">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={s <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}><Icons.Star /></span>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base font-bold text-gray-800">{formatFCFA(product.price)}</span>
          <span className="text-xs text-gray-400 line-through">{formatFCFA(product.originalPrice)}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── ProductDetailPage ────────────────────────────────────────────────────────
function ProductDetailPage({ product, onAddToCart, onToggleWishlist, isWishlisted, onNavigate, onViewProduct }: {
  product: Product; onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void; isWishlisted: boolean;
  onNavigate: (p: Page) => void; onViewProduct: (p: Product) => void;
}) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <button onClick={() => onNavigate("home")} className="text-orange-600 hover:underline">Accueil</button>
        <span>/</span>
        <button onClick={() => onNavigate("shop")} className="text-orange-600 hover:underline">Boutique</button>
        <span>/</span>
        <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
        <div className="relative">
          <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={product.image} alt={product.name}
            className="w-full aspect-square object-cover rounded-2xl" />
          {product.badge && (
            <span className={`absolute top-4 left-4 px-3 py-1 text-sm font-bold rounded-lg ${badgeClass(product.badge)}`}>{product.badge}</span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">-{discount}%</span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-orange-600 font-medium mb-2">{product.category}</span>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (<span key={s} className={s <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}><Icons.Star /></span>))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviews} avis)</span>
          </div>
          <div className="flex items-end gap-4 mb-6">
            <span className="text-2xl md:text-3xl font-extrabold text-orange-600">{formatFCFA(product.price)}</span>
            <span className="text-base md:text-lg text-gray-400 line-through">{formatFCFA(product.originalPrice)}</span>
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs md:text-sm font-bold rounded">-{discount}%</span>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-6 flex items-center gap-2 text-green-700 text-sm">
            <Icons.CheckCircle /> En stock — Livraison estimée aujourd'hui ou demain à Abidjan
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantité:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Icons.Minus /></button>
              <span className="w-12 h-10 flex items-center justify-center font-bold text-gray-800">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"><Icons.Plus /></button>
            </div>
            <span className="text-sm text-gray-500">Total: <strong>{formatFCFA(product.price * qty)}</strong></span>
          </div>

          <div className="flex gap-3 mb-6">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { for (let i = 0; i < qty; i++) onAddToCart(product); }}
              className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-2">
              <Icons.Cart /> Ajouter au panier
            </motion.button>
            <button onClick={() => onToggleWishlist(product.id)}
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${isWishlisted ? "border-red-400 text-red-500 bg-red-50" : "border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500"}`}>
              <Icons.Heart filled={isWishlisted} />
            </button>
          </div>

          <button className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mb-6">
            <Icons.WhatsApp /> Commander par WhatsApp
          </button>

          <div className="grid grid-cols-3 gap-3">
            {[{ icon: <Icons.Truck />, label: "Livraison rapide" }, { icon: <Icons.Shield />, label: "Paiement sécurisé" }, { icon: <Icons.RefreshCw />, label: "Retour facile" }].map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl text-center">
                <span className="text-orange-500">{f.icon}</span>
                <span className="text-xs text-gray-600 font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {["description", "reviews"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-500 hover:text-gray-700"}`}>
              {tab === "description" ? "Description" : `Avis (${product.reviews})`}
            </button>
          ))}
        </div>
        {activeTab === "description" ? (
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>Découvrez <strong>{product.name}</strong> — un produit de qualité supérieure soigneusement sélectionné par nos équipes à travers les marchés locaux de Côte d'Ivoire.</p>
            <p>✅ Produit frais et de qualité contrôlée<br />✅ Emballage hygiénique et sécurisé<br />✅ Livraison dans la chaîne du froid (pour les produits concernés)<br />✅ Satisfaction ou remboursement garanti</p>
            <p>Catégorie: <strong>{product.category}</strong> · Note: <strong>{product.rating}/5</strong> · {product.reviews} avis clients</p>
          </div>
        ) : (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-green-500 flex items-center justify-center text-white text-xs font-bold">AC</div>
                  <span className="font-semibold text-sm text-gray-800">Client Vérifié</span>
                  <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => (<span key={s} className="text-yellow-400"><Icons.Star /></span>))}</div>
                </div>
                <p className="text-sm text-gray-600">Excellent produit ! Frais et livré rapidement. Je recommande vivement EtSmory pour la qualité de leurs produits.</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-5">Produits similaires</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist} isWishlisted={isWishlisted} onViewProduct={onViewProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;