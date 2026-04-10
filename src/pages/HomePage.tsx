import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../components/Icons";
import { heroSlides, categories, flashDeals, allProducts, testimonials } from "../data/products";

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

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return timeLeft;
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

// ─── HeroSlider ───────────────────────────────────────────────────────────────
function HeroSlider({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden bg-gradient-to-r from-orange-600 to-green-600">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight"
                >
                  {heroSlides[current].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl lg:text-2xl opacity-90"
                >
                  {heroSlides[current].subtitle}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => onNavigate("shop")}
                  className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg"
                >
                  {heroSlides[current].cta}
                </motion.button>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="hidden lg:block"
              >
                <img src={heroSlides[current].image} alt="Hero" className="w-full h-80 object-cover rounded-2xl shadow-2xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── StatsBar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { icon: Icons.Truck, label: "Livraison gratuite", value: "dès 10 000 FCFA" },
    { icon: Icons.Shield, label: "Paiement sécurisé", value: "100% garanti" },
    { icon: Icons.RefreshCw, label: "Retour facile", value: "sous 30 jours" },
    { icon: Icons.Headphones, label: "Support 24/7", value: "toujours disponible" },
  ];

  return (
    <div className="bg-white py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <stat.icon />
              </div>
              <div>
                <div className="font-semibold text-sm">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FeaturesBar ──────────────────────────────────────────────────────────────
function FeaturesBar() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Pourquoi choisir EtSmory ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Livraison rapide</h3>
            <p className="text-gray-600">Livraison à domicile en moins de 2h dans Abidjan</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Produits frais</h3>
            <p className="text-gray-600">Sélection rigoureuse de produits locaux et importés</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Headphones className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Service client</h3>
            <p className="text-gray-600">Support disponible 7j/7 pour vos questions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CategoriesSection ─────────────────────────────────────────────────────────
function CategoriesSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">Explorez nos rayons</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("shop")}
              className={`p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center ${cat.color}`}
            >
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <div className="font-semibold">{cat.name}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FlashDealsSection ─────────────────────────────────────────────────────────
function FlashDealsSection({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h from now
  const timeLeft = useCountdown(targetDate);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4; // Show 4 items at a time on desktop
  const totalSlides = Math.ceil(flashDeals.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold">Promotions du jour</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">Des offres exclusives sur vos produits frais et indispensables du quotidien.</p>
          </div>
          <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
            <Icons.Zap />
            <span className="text-red-600 font-bold text-sm">
              Fin dans {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: -currentSlide * 100 + '%' }}
              transition={{ type: 'tween', duration: 0.5 }}
              className="flex"
            >
              {flashDeals.map((deal) => (
                <div key={deal.id} className="flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="relative">
                      <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{deal.discount}%
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs">
                        {deal.sold} vendus
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{deal.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base md:text-lg font-bold text-orange-600">{formatFCFA(deal.price)}</span>
                        <span className="text-xs md:text-sm text-gray-400 line-through">{formatFCFA(deal.originalPrice)}</span>
                      </div>
                      <button
                        onClick={() => onAddToCart({ ...deal, rating: 4.5, reviews: 100, badge: "Promo" })}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
              >
                <Icons.ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
              >
                <Icons.ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PromotionalBanners ────────────────────────────────────────────────────────
function PromotionalBanners({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white cursor-pointer"
            onClick={() => onNavigate("shop")}
          >
            <h3 className="text-2xl font-bold mb-2">Frais du marché</h3>
            <p className="mb-4 opacity-90">Fruits, légumes et produits de saison sélectionnés chaque jour.</p>
            <button className="bg-white text-green-600 px-6 py-2 rounded-full font-bold hover:bg-green-50 transition-colors">
              Voir le marché
            </button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white cursor-pointer"
            onClick={() => onNavigate("shop")}
          >
            <h3 className="text-2xl font-bold mb-2">Livraison express</h3>
            <p className="mb-4 opacity-90">Livraison rapide et fiable pour vos courses quotidiennes.</p>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:bg-orange-50 transition-colors">
              Commander maintenant
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FeaturedProductsSection ───────────────────────────────────────────────────
function FeaturedProductsSection({ onAddToCart, wishlist, onToggleWishlist, onNavigate, onViewProduct }: {
  onAddToCart: (p: Product) => void; wishlist: number[];
  onToggleWishlist: (id: number) => void; onNavigate: (p: Page) => void;
  onViewProduct: (p: Product) => void;
}) {
  const featured = allProducts.slice(0, 8);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">Produits populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden product-card"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover product-card-image" />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded ${badgeClass(product.badge)}`}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    wishlist.includes(product.id) ? "bg-red-500 text-white" : "bg-white/80 text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Icons.Heart filled={wishlist.includes(product.id)} />
                </button>
              </div>
              <div className="p-4">
                <span className="text-sm text-orange-600 font-medium">{product.category}</span>
                <h3 className="font-semibold mb-2 line-clamp-2 cursor-pointer hover:text-orange-600 transition-colors" onClick={() => onViewProduct(product)}>
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icons.Star key={s} className={`w-3 h-3 ${s <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base md:text-lg font-bold text-orange-600">{formatFCFA(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs md:text-sm text-gray-400 line-through ml-2">{formatFCFA(product.originalPrice)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Icons.Plus />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate("shop")}
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors"
          >
            Voir tous les produits
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── TestimonialsSection ───────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">Témoignages clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Icons.Star key={s} className={`w-4 h-4 ${s <= t.rating ? "text-yellow-400" : "text-gray-200"}`} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">"{t.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-orange-500 to-green-600">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">Restez informé</h2>
        <p className="text-lg opacity-90 mb-8">Recevez nos offres exclusives et nouveautés par email</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleSubscribe}
            disabled={subscribed}
            className="px-8 py-3 bg-white text-orange-600 rounded-full font-bold hover:bg-orange-50 transition-colors disabled:opacity-50"
          >
            {subscribed ? "Inscrit !" : "S'inscrire"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
function HomePage({ onAddToCart, wishlist, onToggleWishlist, onNavigate, onViewProduct }: {
  onAddToCart: (p: Product) => void; wishlist: number[];
  onToggleWishlist: (id: number) => void; onNavigate: (p: Page) => void;
  onViewProduct: (p: Product) => void;
}) {
  return (
    <main>
      <HeroSlider onNavigate={onNavigate} />
      <StatsBar />
      <FeaturesBar />
      <CategoriesSection onNavigate={onNavigate} />
      <FlashDealsSection onAddToCart={onAddToCart} />
      <PromotionalBanners onNavigate={onNavigate} />
      <FeaturedProductsSection onAddToCart={onAddToCart} wishlist={wishlist} onToggleWishlist={onToggleWishlist} onNavigate={onNavigate} onViewProduct={onViewProduct} />
      <TestimonialsSection />
      <Newsletter />
    </main>
  );
}

export default HomePage;