import 'package:conecta_parana/core/app_theme.dart';
import 'package:conecta_parana/src/presentation/widgets/placeholder_screen.dart';
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Conecta Paraná',
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: ThemeMode.system,
      home: const PlaceholderScreen(),
    );
  }
}
