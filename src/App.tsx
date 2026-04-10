import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "./components/Icons";
import { allProducts, navCategories } from "./data/products";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import TrackOrder from "./pages/TrackOrder";
import FAQ from "./pages/FAQ";
import SupportPage from "./pages/SupportPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import LegalPage from "./pages/LegalPage";
import AccountPage from "./pages/AccountPage";

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

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "wishlist" | "contact" | "about" | "signup" | "login" | "track" | "faq" | "support" | "terms" | "privacy" | "legal" | "account";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatFCFA(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

function getPageFromPath(pathname: string): Page {
  if (pathname === "/") return "home";
  if (pathname === "/shop") return "shop";
  if (pathname.startsWith("/product/")) return "product";
  if (pathname === "/wishlist") return "wishlist";
  if (pathname === "/contact") return "contact";
  if (pathname === "/about") return "about";
  if (pathname === "/support") return "support";
  if (pathname === "/terms") return "terms";
  if (pathname === "/privacy") return "privacy";
  if (pathname === "/legal") return "legal";
  if (pathname === "/account") return "account";
  if (pathname === "/checkout") return "checkout";
  return "home";
}

// ─── Components ───────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="bg-orange-500 text-white text-xs sm:text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-4">
        <span>🚚 Livraison gratuite dès 10 000 FCFA</span>
        <span className="hidden sm:inline">•</span>
        <span>📞 Support 24/7</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden md:inline">⭐ 4.8/5 sur Trustpilot</span>
      </div>
    </div>
  );
}

function Header({ cartCount, wishlistCount, onNavigate, currentPage, onCartClick, searchQuery, setSearchQuery }: {
  cartCount: number; wishlistCount: number; onNavigate: (p: Page) => void; currentPage: Page;
  onCartClick: () => void; searchQuery: string; setSearchQuery: (q: string) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
              <span className="text-2xl">🛒</span>
              <h1 className="text-xl font-extrabold"><span className="text-orange-500">Et</span><span className="text-green-500">Smory</span></h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {[
                { key: "home", label: "Accueil" },
                { key: "shop", label: "Boutique" },
                { key: "about", label: "À propos" },

                { key: "contact", label: "Contact" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => onNavigate(key as Page)}
                  className={`font-medium transition-colors ${currentPage === key ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}>
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-xl px-4 py-2 gap-2 flex-1 max-w-md">
              <Icons.Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Rechercher des produits..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent flex-1 outline-none text-sm" />
            </div>
            <button onClick={() => onNavigate("account")} className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-orange-400 hover:text-orange-600 transition-colors">
              <Icons.User className="w-4 h-4" />
              Compte
            </button>
            <button onClick={() => onNavigate("wishlist")} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icons.Heart filled={false} className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={onCartClick} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icons.ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="hidden sm:flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
              <button onClick={() => onNavigate("login")} className="px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                Se connecter
              </button>
              <button onClick={() => onNavigate("signup")} className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                S'inscrire
              </button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-4 px-4">
              {[
                { key: "home", label: "Accueil" },
                { key: "shop", label: "Boutique" },
                { key: "about", label: "À propos" },
                { key: "contact", label: "Contact" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => { onNavigate(key as Page); setIsMobileMenuOpen(false); }}
                  className={`text-left font-medium transition-colors ${currentPage === key ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}>
                  {label}
                </button>
              ))}
            </nav>
            <div className="px-4 mt-4">
              <button onClick={() => { onNavigate("account"); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-orange-400 hover:text-orange-600 transition-colors">
                <Icons.User className="w-4 h-4" />
                Compte
              </button>
            </div>
            <div className="px-4 mt-4 sm:hidden">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 gap-2">
                <Icons.Search className="w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Rechercher des produits..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }: {
  isOpen: boolean; onClose: () => void; cart: CartItem[];
  onUpdateQuantity: (id: number, qty: number) => void; onRemoveItem: (id: number) => void; onCheckout: () => void;
}) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = total >= 10000 ? 0 : 1500;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent z-50" onClick={onClose} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Panier ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Icons.ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Votre panier est vide</h3>
                  <p className="text-gray-500 text-sm">Ajoutez des produits pour commencer vos achats</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 text-sm line-clamp-2 leading-tight">{item.name}</h4>
                        <p className="text-orange-600 font-bold text-sm mt-1 whitespace-nowrap">{formatFCFA(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold hover:bg-gray-300 flex-shrink-0">
                            -
                          </button>
                          <span className="text-sm font-medium w-8 text-center flex-shrink-0">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold hover:bg-gray-300 flex-shrink-0">
                            +
                          </button>
                        </div>
                      </div>
                      <button onClick={() => onRemoveItem(item.id)} className="p-1 hover:bg-red-100 rounded text-red-500 flex-shrink-0 self-start">
                        <Icons.Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Sous-total</span><span className="font-medium">{formatFCFA(total)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Livraison</span>
                    <span className={`font-medium ${delivery === 0 ? "text-green-600" : ""}`}>{delivery === 0 ? "Gratuite 🎉" : formatFCFA(delivery)}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-orange-600">{formatFCFA(total + delivery)}</span>
                  </div>
                </div>
                <button onClick={onCheckout} className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
                  Commander
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Toast({ message, isVisible }: { message: string; isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors z-40">
          <Icons.ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function WhatsAppButton() {
  return (
    <a href="https://wa.me/2250700000000" target="_blank" rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-40">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>
    </a>
  );
}

function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => onNavigate("home")}>
              <span className="text-2xl">🛒</span>
              <h3 className="text-xl font-extrabold"><span className="text-orange-400">Et</span><span className="text-green-400">Smory</span></h3>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Votre supermarché en ligne en Côte d'Ivoire. Produits frais, viande, poisson et épicerie livrés à domicile.
            </p>
            <div className="flex gap-3">
              {["F", "T", "I", "Y"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <span className="text-xs font-bold">{s}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate("home")} className="hover:text-orange-400 transition-colors">Accueil</button></li>
              <li><button onClick={() => onNavigate("shop")} className="hover:text-orange-400 transition-colors">Boutique</button></li>
              <li><button onClick={() => onNavigate("wishlist")} className="hover:text-orange-400 transition-colors">Favoris</button></li>
              <li><button onClick={() => onNavigate("contact")} className="hover:text-orange-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2 text-sm">
              {navCategories.slice(0, 5).map((cat) => (
                <li key={cat}><button onClick={() => onNavigate("shop")} className="hover:text-orange-400 transition-colors">{cat}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Service client</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate("support")} className="hover:text-orange-400 transition-colors">Aide & Support</button></li>
              <li><button onClick={() => onNavigate("track")} className="hover:text-orange-400 transition-colors">Suivre ma commande</button></li>
              <li><button onClick={() => onNavigate("faq")} className="hover:text-orange-400 transition-colors">FAQ</button></li>
              <li><button onClick={() => onNavigate("terms")} className="hover:text-orange-400 transition-colors">Conditions générales</button></li>
              <li><button onClick={() => onNavigate("privacy")} className="hover:text-orange-400 transition-colors">Politique de confidentialité</button></li>
              <li><button onClick={() => onNavigate("legal")} className="hover:text-orange-400 transition-colors">Mentions légales</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-3">Restez informé de nos offres spéciales</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Votre email" className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-orange-500 focus:outline-none" />
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                S'abonner
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 EtSmory. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();
  const routerNavigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("es-cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem("es-wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("es-cart", JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("es-wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  const navigate = useCallback((page: Page, productId?: number) => {
    if (page === "product") {
      if (productId) {
        routerNavigate(`/product/${productId}`);
      } else {
        routerNavigate("/shop");
      }
    } else {
      routerNavigate(page === "home" ? "/" : `/${page}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [routerNavigate]);

  const viewProduct = useCallback((product: Product) => {
    navigate("product", product.id);
  }, [navigate]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} ajouté au panier !`);
  }, []);

  const updateQuantity = useCallback((id: number, qty: number) => {
    if (qty <= 0) setCart((prev) => prev.filter((i) => i.id !== id));
    else setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  }, []);

  const removeItem = useCallback((id: number) => setCart((prev) => prev.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const currentPage = getPageFromPath(location.pathname);

  function ProductDetailRoute() {
    const { id } = useParams<{ id: string }>();
    const product = id ? allProducts.find((p) => p.id === Number(id)) : null;

    if (!product) {
      return <Navigate to="/shop" replace />;
    }

    return (
      <ProductDetailPage
        product={product}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={wishlist.includes(product.id)}
        onNavigate={navigate}
        onViewProduct={viewProduct}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopBar />
      <Header cartCount={cartCount} wishlistCount={wishlist.length} onNavigate={navigate} currentPage={currentPage}
        onCartClick={() => setCartOpen(true)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          <Routes location={location}>
            <Route path="/" element={
              <HomePage onAddToCart={addToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} onNavigate={navigate} onViewProduct={viewProduct} />
            } />
            <Route path="/shop" element={
              <ShopPage onAddToCart={addToCart} wishlist={wishlist} onToggleWishlist={toggleWishlist} onViewProduct={viewProduct} searchQuery={searchQuery} />
            } />
            <Route path="/product/:id" element={<ProductDetailRoute />} />
            <Route path="/wishlist" element={
              <WishlistPage wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onNavigate={navigate} onViewProduct={viewProduct} />
            } />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUs onNavigate={navigate} />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/signup" element={<SignUp onNavigate={navigate} />} />
            <Route path="/login" element={<Login onNavigate={navigate} />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} onNavigate={navigate} onClearCart={clearCart} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer onNavigate={navigate} />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart}
        onUpdateQuantity={updateQuantity} onRemoveItem={removeItem}
        onCheckout={() => { setCartOpen(false); navigate("checkout"); }} />

      <Toast message={toast.message} isVisible={toast.visible} />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}
