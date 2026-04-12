class Product {
  final int id;
  final String name;
  final String image;
  final int price;
  final int originalPrice;
  final double rating;
  final int reviews;
  final String? badge;
  final String category;
  final int? sold;
  final int? discount;

  const Product({
    required this.id,
    required this.name,
    required this.image,
    required this.price,
    required this.originalPrice,
    required this.rating,
    required this.reviews,
    this.badge,
    required this.category,
    this.sold,
    this.discount,
  });
}
