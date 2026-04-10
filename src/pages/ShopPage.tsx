import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../components/Icons";
import { allProducts, navCategories } from "../data/products";

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
          <span className="text-base font-bold text-gray-800">{formatFCFA(product.price)}</span>
          <span className="text-xs text-gray-400 line-through">{formatFCFA(product.originalPrice)}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── ShopPage ─────────────────────────────────────────────────────────────────
function ShopPage({ onAddToCart, wishlist, onToggleWishlist, onViewProduct, searchQuery }: {
  onAddToCart: (p: Product) => void; wishlist: number[];
  onToggleWishlist: (id: number) => void; onViewProduct: (p: Product) => void;
  searchQuery: string;
}) {
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allProducts
    .filter((p) => {
      const catOk = activeCategory === "Tout" || p.category === activeCategory;
      const priceOk = p.price >= priceRange[0] && p.price <= priceRange[1];
      const searchOk = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return catOk && priceOk && searchOk;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
        <span className="text-orange-600 font-medium">Accueil</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Boutique</span>
        {searchQuery && <><span>/</span><span className="text-gray-800">Résultats pour "{searchQuery}"</span></>}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4">
              <h3 className="text-white font-bold flex items-center gap-2"><Icons.Filter /> Filtres</h3>
            </div>
            <div className="p-5 space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Catégories</h4>
                <div className="space-y-1">
                  {["Tout", ...navCategories].map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${activeCategory === cat ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                      <span>{cat}</span>
                      {activeCategory === cat && <Icons.Check />}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Prix max: {formatFCFA(priceRange[1])}</h4>
                <input type="range" min="0" max="25000" step="500" value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-orange-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0 FCFA</span>
                  <span>25 000 FCFA</span>
                </div>
              </div>
              {/* Rating */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Note minimum</h4>
                <div className="flex gap-2">
                  {[4, 4.5, 5].map((r) => (
                    <button key={r} className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs hover:border-orange-400 hover:text-orange-500 transition-colors">
                      <span className="text-yellow-400"><Icons.Star /></span> {r}+
                    </button>
                  ))}
                </div>
              </div>
              {/* Badges */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Labels</h4>
                <div className="flex flex-wrap gap-2">
                  {["Frais", "Bio", "Local", "Promo", "Premium"].map((badge) => (
                    <span key={badge} className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${badgeClass(badge)}`}>{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500"><strong className="text-gray-800">{filtered.length}</strong> produits trouvés</span>
              <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:border-orange-400 transition-colors">
                <Icons.Filter /> Filtres
              </button>
            </div>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-orange-400">
                <option value="popular">Popularité</option>
                <option value="rating">Meilleures notes</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-600"}`}>
                  <Icons.Grid />
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-600"}`}>
                  <Icons.List />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche</p>
            </div>
          ) : viewMode === "grid" ? (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist} isWishlisted={wishlist.includes(p.id)} onViewProduct={onViewProduct} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 p-4 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-28 h-28 object-cover rounded-xl flex-shrink-0 cursor-pointer" onClick={() => onViewProduct(p)} />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-orange-600 font-medium">{p.category}</span>
                    <h3 className="font-semibold text-gray-800 mt-0.5 mb-1 cursor-pointer hover:text-orange-600" onClick={() => onViewProduct(p)}>{p.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (<span key={s} className={s <= Math.floor(p.rating) ? "text-yellow-400" : "text-gray-200"}><Icons.Star /></span>))}
                      <span className="text-xs text-gray-500 ml-1">({p.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-800">{formatFCFA(p.price)}</span>
                        <span className="text-xs text-gray-400 line-through ml-2">{formatFCFA(p.originalPrice)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => onToggleWishlist(p.id)} className={`w-9 h-9 rounded-lg flex items-center justify-center ${wishlist.includes(p.id) ? "text-red-500 bg-red-50" : "text-gray-400 bg-gray-50 hover:text-red-500"}`}>
                          <Icons.Heart filled={wishlist.includes(p.id)} />
                        </button>
                        <button onClick={() => onAddToCart(p)}
                          className="flex items-center gap-1 px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors">
                          <Icons.Cart /> Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;