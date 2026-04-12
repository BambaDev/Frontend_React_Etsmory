import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../models/product.dart';
import '../utils/format_utils.dart';

class FlashDealCard extends StatelessWidget {
  final Product deal;
  final bool isWishlisted;
  final VoidCallback onToggleWishlist;

  const FlashDealCard({
    super.key,
    required this.deal,
    required this.isWishlisted,
    required this.onToggleWishlist,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius: const BorderRadius.only(topLeft: Radius.circular(14), topRight: Radius.circular(14)),
                child: Image.network(deal.image, height: 120, width: double.infinity, fit: BoxFit.cover),
              ),
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEF4444),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text('-${deal.discount ?? 0}%', style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ),
              Positioned(
                top: 8,
                right: 8,
                child: IconButton(
                  onPressed: onToggleWishlist,
                  icon: Icon(
                    isWishlisted ? Icons.favorite : Icons.favorite_border,
                    color: isWishlisted ? Colors.red : Colors.white,
                    size: 20,
                  ),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.black.withAlpha(51),
                    padding: const EdgeInsets.all(6),
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(deal.name, style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.black), maxLines: 2, overflow: TextOverflow.ellipsis),
                const SizedBox(height: 4),
                Row(
                  children: [
                    Text(formatFCFA(deal.price), style: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.bold, color: const Color(0xFFF97316))),
                    const SizedBox(width: 8),
                    Text(formatFCFA(deal.originalPrice), style: GoogleFonts.inter(fontSize: 12, color: Colors.grey, decoration: TextDecoration.lineThrough)),
                  ],
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    const Icon(Icons.star, color: Colors.amber, size: 14),
                    Text('${deal.rating} (${deal.reviews})', style: GoogleFonts.inter(fontSize: 12, color: Colors.grey)),
                    const Spacer(),
                    Text('${deal.sold ?? 0} vendus', style: GoogleFonts.inter(fontSize: 10, color: Colors.grey[600])),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
