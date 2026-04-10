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

// ─── WishlistPage ─────────────────────────────────────────────────────────────
function WishlistPage({ wishlist, onAddToCart, onToggleWishlist, onNavigate, onViewProduct }: {
  wishlist: number[]; onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void; onNavigate: (p: Page) => void;
  onViewProduct: (p: Product) => void;
}) {
  const wishlisted = allProducts.filter((p) => wishlist.includes(p.id));
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Mes Favoris</h1>
      <p className="text-gray-500 text-sm mb-6">{wishlisted.length} produit(s) dans votre liste de souhaits</p>
      {wishlisted.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Votre liste de favoris est vide</h3>
          <p className="text-gray-500 mb-6">Explorez nos produits et ajoutez vos préférés ici</p>
          <button onClick={() => onNavigate("shop")} className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
            Explorer la boutique
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlisted.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist} isWishlisted={true} onViewProduct={onViewProduct} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;