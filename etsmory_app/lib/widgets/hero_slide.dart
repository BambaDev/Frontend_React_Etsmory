import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class HeroSlide extends StatelessWidget {
  final String image;
  final String title;
  final String subtitle;
  final Gradient gradient;

  const HeroSlide({
    super.key,
    required this.image,
    required this.title,
    required this.subtitle,
    required this.gradient,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(gradient: gradient, borderRadius: BorderRadius.circular(16)),
      child: Stack(
        fit: StackFit.expand,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(16),
            child: Image.network(image, fit: BoxFit.cover, color: Colors.white.withAlpha(128), colorBlendMode: BlendMode.overlay),
          ),
          Padding(
            padding: const EdgeInsets.all(32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(title, style: GoogleFonts.inter(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 8),
                Text(subtitle, style: GoogleFonts.inter(fontSize: 18, color: Colors.white.withAlpha(230))),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFFF97316),
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child: const Text('Acheter maintenant'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
