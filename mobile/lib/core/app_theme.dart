import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  static ThemeData get light {
    return ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF141A69)),
      useMaterial3: true,
      brightness: Brightness.light,
    );
  }

  static ThemeData get dark {
    return ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF141A69)),
      useMaterial3: true,
      brightness: Brightness.dark,
    );
  }
}