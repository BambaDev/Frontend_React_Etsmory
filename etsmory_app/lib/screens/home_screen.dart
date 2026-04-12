import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../data/product_data.dart';
import '../models/cart_item.dart';
import '../models/product.dart';
import '../utils/format_utils.dart';
import '../widgets/category_card.dart';
import '../widgets/feature_card.dart';
import '../widgets/flash_deal_card.dart';
import '../widgets/hero_slide.dart';
import '../widgets/product_card.dart';
import '../widgets/promo_banner_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<CartItem> _cart = [];
  final List<int> _wishlist = [];
  final PageController _pageController = PageController();
  int _currentSlide = 0;
  String _activeFilter = 'Tout';

  void _addToCart(Product product) {
    setState(() {
      final existingIndex = _cart.indexWhere((c) => c.product.id == product.id);
      if (existingIndex != -1) {
        _cart[existingIndex].quantity++;
      } else {
        _cart.add(CartItem(product: product));
      }
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.white),
            const SizedBox(width: 8),
            Text('${product.name} ajouté au panier!'),
          ],
        ),
        backgroundColor: const Color(0xFF1F2937),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _toggleWishlist(int productId) {
    setState(() {
      if (_wishlist.contains(productId)) {
        _wishlist.remove(productId);
      } else {
        _wishlist.add(productId);
      }
    });
  }

  int get cartTotal => _cart.fold(0, (sum, item) => sum + item.product.price * item.quantity);
  int get cartCount => _cart.fold(0, (sum, item) => sum + item.quantity);

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 5), () {
      if (_pageController.hasClients) {
        _pageController.nextPage(duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
      }
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            _buildTopBar(),
            _buildHeader(),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    _buildHeroSlider(),
                    _buildFeaturesBar(),
                    _buildCategoriesSection(),
                    _buildFlashDealsSection(),
                    _buildPromotionalBanners(),
                    _buildFeaturedProducts(),
                    _buildNewsletter(),
                    _buildFooter(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: _buildWhatsAppButton(),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  Widget _buildTopBar() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 6),
      decoration: const BoxDecoration(
        gradient: LinearGradient(colors: [Color(0xFFEA580C), Color(0xFF16A34A)]),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                'Livraison gratuite à partir de 10 000 FCFA',
                style: GoogleFonts.inter(fontSize: 12, color: Colors.white, fontWeight: FontWeight.w500),
                textAlign: TextAlign.center,
              ),
            ),
            const Text('|', style: TextStyle(color: Colors.white24)),
            Expanded(
              child: Text(
                'Paiement sécurisé',
                style: GoogleFonts.inter(fontSize: 12, color: Colors.white, fontWeight: FontWeight.w500),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [BoxShadow(color: Colors.black.withAlpha(13), blurRadius: 4, offset: const Offset(0, 2))],
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF97316),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.shopping_cart, color: Colors.white, size: 20),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('MarchéCI', style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black)),
                      Text('Supermarché en ligne', style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[600])),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.search, color: Colors.grey),
                ),
                Stack(
                  children: [
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.shopping_bag_outlined, color: Colors.grey),
                    ),
                    if (cartCount > 0)
                      Positioned(
                        right: 0,
                        top: 0,
                        child: Container(
                          padding: const EdgeInsets.all(4),
                          decoration: const BoxDecoration(
                            color: Color(0xFFF97316),
                            shape: BoxShape.circle,
                          ),
                          child: Text(
                            cartCount.toString(),
                            style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                _navItem('Accueil'),
                _navItem('Boutique'),
                _navItem('Catégories'),
                _navItem('Contact'),
                _navItem('Panier', badge: true),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _navItem(String label, {bool badge = false}) {
    return InkWell(
      onTap: () {},
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(label, style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[700], fontWeight: FontWeight.w500)),
            if (badge)
              Container(
                margin: const EdgeInsets.only(left: 4),
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: const Color(0xFFF97316),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  cartCount.toString(),
                  style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeroSlider() {
    final slides = [
      {
        'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/1e8efd62b-8f62-4d6b-ba4d-52589060dd14.png',
        'title': 'Poisson Frais',
        'subtitle': 'Tilapia, Maquereau & plus',
        'gradient': const LinearGradient(colors: [Color(0xFF3B82F6), Color(0xFF1D4ED8)]),
      },
      {
        'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/196ac23d1-3919-4981-9e7f-12fbef702a03.png',
        'title': 'Viande & Volaille',
        'subtitle': 'Qualité garantie',
        'gradient': const LinearGradient(colors: [Color(0xFFEF4444), Color(0xFFB91C1C)]),
      },
      {
        'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/154321a37-4686-41ca-a575-0f76fddc6812.png',
        'title': 'Fruits Tropicaux',
        'subtitle': 'Mangues, Bananes & plus',
        'gradient': const LinearGradient(colors: [Color(0xFFEAB308), Color(0xFFEA580C)]),
      },
    ];

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (MediaQuery.of(context).size.width > 800)
            Container(
              width: 300,
              margin: const EdgeInsets.only(right: 16),
              child: Column(
                children: [
                  _buildCategoriesSection(),
                  const SizedBox(height: 16),
                  _buildFlashDealsSection(),
                ],
              ),
            ),
          Expanded(
            child: SizedBox(
              height: 400,
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (index) => setState(() => _currentSlide = index),
                itemCount: slides.length,
                itemBuilder: (context, index) {
                  final slide = slides[index];
                  return HeroSlide(
                    image: slide['image'] as String,
                    title: slide['title'] as String,
                    subtitle: slide['subtitle'] as String,
                    gradient: slide['gradient'] as Gradient,
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturesBar() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Wrap(
        spacing: 12,
        runSpacing: 12,
        children: const [
          FeatureCard(icon: Icons.local_shipping_outlined, title: 'Livraison Gratuite', description: 'À partir de 10 000 FCFA'),
          FeatureCard(icon: Icons.ac_unit_outlined, title: 'Chaîne du Froid', description: 'Produits congelés garantis'),
          FeatureCard(icon: Icons.shield_outlined, title: 'Paiement Sécurisé', description: 'Mobile Money & Carte'),
          FeatureCard(icon: Icons.replay_outlined, title: 'Retour Facile', description: 'Satisfait ou remboursé'),
        ],
      ),
    );
  }

  Widget _buildCategoriesSection() {
    final cats = [
      {'name': 'Poissons', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/1e8efd62b-8f62-4d6b-ba4d-52589060dd14.png', 'bg': const Color(0xFFEFF6FF)},
      {'name': 'Viandes', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/196ac23d1-3919-4981-9e7f-12fbef702a03.png', 'bg': const Color(0xFFFEF2F2)},
      {'name': 'Fruits', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/154321a37-4686-41ca-a575-0f76fddc6812.png', 'bg': const Color(0xFFFEFCE8)},
      {'name': 'Légumes', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/13e17b83a-ac23-412b-9e12-e006f8b21046.png', 'bg': const Color(0xFFF0FDF4)},
      {'name': 'Épicerie', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/11c3f7ac7-adb8-4ff6-b018-4323bb69d379.png', 'bg': const Color(0xFFFEF3C7)},
      {'name': 'Congelés', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/172abdaff-ef00-4bb6-954f-d5a30b41fb2c.png', 'bg': const Color(0xFFECFEFF)},
      {'name': 'Boissons', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/1e22fc1a8-9876-4561-9275-2e65523e2e90.png', 'bg': const Color(0xFFEEF2FF)},
      {'name': 'Laitiers', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/1e22fc1a8-9876-4561-9275-2e65523e2e90.png', 'bg': const Color(0xFFF0F9FF)},
      {'name': 'Boulangerie', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/1995c4bd6-8fee-4084-a9b5-c1c6704c4336.png', 'bg': const Color(0xFFFFF7ED)},
      {'name': 'Produits Locaux', 'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/14111ccfb-796f-4c33-8e16-893297d384f7.png', 'bg': const Color(0xFFF7FEE7)},
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Catégories', style: GoogleFonts.inter(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
              TextButton(onPressed: () {}, child: Text('Voir tout', style: GoogleFonts.inter(color: const Color(0xFFF97316)))),
            ],
          ),
          const SizedBox(height: 16),
          LayoutBuilder(
            builder: (context, constraints) {
              final crossAxisCount = constraints.maxWidth > 800 ? 5 : 4;
              return GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 0.8,
                ),
                itemCount: cats.length,
                itemBuilder: (context, index) {
                  final cat = cats[index];
                  return CategoryCard(
                    name: cat['name'] as String,
                    image: cat['image'] as String,
                    backgroundColor: cat['bg'] as Color,
                    onTap: () {},
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildFlashDealsSection() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [Color(0xFFF97316), Color(0xFFEF4444), Color(0xFFF97316)]),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Offres Flash ', style: GoogleFonts.inter(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
                  Text("Jusqu'à -32% de réduction", style: GoogleFonts.inter(fontSize: 14, color: Colors.orange[100])),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.white.withAlpha(26),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.timer, color: Colors.white, size: 16),
                    const SizedBox(width: 4),
                    Text('23:45:12', style: GoogleFonts.inter(fontSize: 12, color: Colors.white, fontWeight: FontWeight.w500)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          LayoutBuilder(
            builder: (context, constraints) {
              final crossAxisCount = constraints.maxWidth > 800 ? 3 : 2;
              return GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 0.75,
                ),
                itemCount: flashDeals.length,
                itemBuilder: (context, index) {
                  final deal = flashDeals[index];
                  return FlashDealCard(
                    deal: deal,
                    isWishlisted: _wishlist.contains(deal.id),
                    onToggleWishlist: () => _toggleWishlist(deal.id),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildPromotionalBanners() {
    final banners = [
      {
        'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/1e8efd62b-8f62-4d6b-ba4d-52589060dd14.png',
        'title': 'Poisson Frais',
        'subtitle': 'Tilapia, Maquereau & plus',
        'gradient': const LinearGradient(colors: [Color(0xFF3B82F6), Color(0xFF1D4ED8)]),
      },
      {
        'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/196ac23d1-3919-4981-9e7f-12fbef702a03.png',
        'title': 'Viande & Volaille',
        'subtitle': 'Qualité garantie',
        'gradient': const LinearGradient(colors: [Color(0xFFEF4444), Color(0xFFB91C1C)]),
      },
      {
        'image': 'https://image.qwenlm.ai/public_source/bcbd4244-eab2-4f04-8326-8af39caffa5f/154321a37-4686-41ca-a575-0f76fddc6812.png',
        'title': 'Fruits Tropicaux',
        'subtitle': 'Mangues, Bananes & plus',
        'gradient': const LinearGradient(colors: [Color(0xFFEAB308), Color(0xFFEA580C)]),
      },
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final crossAxisCount = constraints.maxWidth > 800 ? 3 : 1;
          return GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: crossAxisCount,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 2,
            ),
            itemCount: banners.length,
            itemBuilder: (context, index) {
              final banner = banners[index];
              return PromoBannerCard(
                image: banner['image'] as String,
                title: banner['title'] as String,
                subtitle: banner['subtitle'] as String,
                gradient: banner['gradient'] as Gradient,
              );
            },
          );
        },
      ),
    );
  }

  Widget _buildFeaturedProducts() {
    final filters = ['Tout', 'Poissons', 'Viandes', 'Fruits', 'Légumes', 'Épicerie', 'Congelés', 'Laitiers'];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Produits Populaires', style: GoogleFonts.inter(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black)),
              TextButton(onPressed: () {}, child: Text('Voir tout', style: GoogleFonts.inter(color: const Color(0xFFF97316)))),
            ],
          ),
          const SizedBox(height: 16),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: filters.map((filter) {
                final isActive = filter == _activeFilter;
                return Container(
                  margin: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(filter, style: GoogleFonts.inter(color: isActive ? Colors.white : Colors.grey[700], fontSize: 12)),
                    selected: isActive,
                    onSelected: (selected) {
                      setState(() => _activeFilter = filter);
                    },
                    backgroundColor: Colors.grey[100],
                    selectedColor: const Color(0xFFF97316),
                    checkmarkColor: Colors.white,
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),
          LayoutBuilder(
            builder: (context, constraints) {
              final filtered = _activeFilter == 'Tout' ? allProducts : allProducts.where((p) => p.category == _activeFilter).toList();
              final crossAxisCount = constraints.maxWidth > 800 ? 4 : 2;
              return GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: crossAxisCount,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 0.75,
                ),
                itemCount: filtered.length,
                itemBuilder: (context, index) {
                  final product = filtered[index];
                  return ProductCard(
                    product: product,
                    isWishlisted: _wishlist.contains(product.id),
                    onAddToCart: () => _addToCart(product),
                    onToggleWishlist: () => _toggleWishlist(product.id),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildNewsletter() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 48),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [Color(0xFFF97316), Color(0xFFEA580C), Color(0xFF16A34A)]),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          const Text('🎁', style: TextStyle(fontSize: 40)),
          const SizedBox(height: 12),
          Text('Recevez nos offres exclusives', style: GoogleFonts.inter(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 8),
          Text('Inscrivez-vous pour recevoir les meilleures promos directement dans votre boîte mail.', textAlign: TextAlign.center, style: GoogleFonts.inter(fontSize: 14, color: Colors.orange[100])),
          const SizedBox(height: 20),
          Container(
            constraints: const BoxConstraints(maxWidth: 400),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Votre adresse email',
                hintStyle: GoogleFonts.inter(color: Colors.grey[400]),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              ),
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: const Color(0xFFF97316),
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            child: Text('S\'inscrire', style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.w600)),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter() {
    return Container(
      margin: const EdgeInsets.only(top: 32),
      color: const Color(0xFF111827),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 32),
      child: Column(
        children: [
          Wrap(
            spacing: 32,
            runSpacing: 24,
            children: [
              _footerBrand(),
              _footerLinks('Acheter', ['Boutique', 'Catégories', 'Offres Flash', 'Nouveautés']),
              _footerLinks('Entreprise', ['À propos', 'Carrières', 'Presse', 'Contact']),
              _footerLinks('Support', ['FAQ', 'Livraison', 'Retours', 'Service Client']),
              _footerContact(),
            ],
          ),
          const Divider(color: Colors.white12, height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('© 2024 MarchéCI. Tous droits réservés.', style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[400])),
              Text('Fait avec ❤️ en Côte d\'Ivoire', style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[400])),
            ],
          ),
        ],
      ),
    );
  }

  Widget _footerBrand() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: const Color(0xFFF97316),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.shopping_cart, color: Colors.white, size: 20),
            ),
            const SizedBox(width: 12),
            Text('MarchéCI', style: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
          ],
        ),
        const SizedBox(height: 12),
        Text('Votre supermarché en ligne en Côte d\'Ivoire. Produits frais, viande, poisson et épicerie livrés à domicile.', style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[400], height: 1.6)),
        const SizedBox(height: 16),
        Row(
          children: ['f', 't', 'i', 'y'].map((s) => Container(
            margin: const EdgeInsets.only(right: 8),
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: Colors.white.withAlpha(10),
              borderRadius: BorderRadius.circular(4),
            ),
            alignment: Alignment.center,
            child: Text(s.toUpperCase(), style: TextStyle(color: Colors.grey[400], fontSize: 12, fontWeight: FontWeight.bold)),
          )).toList(),
        ),
      ],
    );
  }

  Widget _footerLinks(String title, List<String> links) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: GoogleFonts.inter(fontWeight: FontWeight.w600, color: Colors.white, fontSize: 14)),
        const SizedBox(height: 12),
        ...links.map((l) => Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: Text(l, style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[400])),
        )),
      ],
    );
  }

  Widget _footerContact() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Contact', style: GoogleFonts.inter(fontWeight: FontWeight.w600, color: Colors.white, fontSize: 14)),
        const SizedBox(height: 12),
        _contactRow(Icons.location_on_outlined, 'Cocody, Abidjan, Côte d\'Ivoire'),
        _contactRow(Icons.phone_outlined, '+225 07 08 09 10 11'),
        _contactRow(Icons.email_outlined, 'contact@marcheci.com'),
        Row(
          children: [
            const Icon(Icons.chat, color: Colors.green, size: 16),
            const SizedBox(width: 8),
            Text('WhatsApp', style: GoogleFonts.inter(fontSize: 12, color: Colors.green[400])),
          ],
        ),
      ],
    );
  }

  Widget _contactRow(IconData icon, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          Icon(icon, color: Colors.grey[400], size: 16),
          const SizedBox(width: 8),
          Text(text, style: GoogleFonts.inter(fontSize: 12, color: Colors.grey[400])),
        ],
      ),
    );
  }

  Widget _buildWhatsAppButton() {
    return Container(
      decoration: BoxDecoration(shape: BoxShape.circle, boxShadow: [BoxShadow(color: Colors.green.withAlpha(100), blurRadius: 8)]),
      child: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Colors.green,
        child: const Icon(Icons.chat, color: Colors.white),
      ),
    );
  }
}
