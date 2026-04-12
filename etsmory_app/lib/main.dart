import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const MarcheCIApp());
}

class MarcheCIApp extends StatelessWidget {
  const MarcheCIApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MarchéCI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFF97316),
          primary: const Color(0xFFF97316),
          secondary: const Color(0xFF16A34A),
        ),
        scaffoldBackgroundColor: const Color(0xFFF9FAFB),
        fontFamily: GoogleFonts.inter().fontFamily,
      ),
      home: const HomeScreen(),
    );
  }
}
