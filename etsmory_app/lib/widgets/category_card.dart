import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CategoryCard extends StatelessWidget {
  final String name;
  final String image;
  final Color backgroundColor;
  final VoidCallback onTap;

  const CategoryCard({
    super.key,
    required this.name,
    required this.image,
    required this.backgroundColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(color: backgroundColor, borderRadius: BorderRadius.circular(12)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.network(image, width: 40, height: 40, fit: BoxFit.cover),
            const SizedBox(height: 8),
            Text(name, style: GoogleFonts.inter(fontSize: 12, fontWeight: FontWeight.w500, color: Colors.black), textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
