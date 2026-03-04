import 'package:conecta_parana/app.dart';
import 'package:conecta_parana/core/config/environment.dart';
import 'package:flutter/material.dart';

void main() {
  Environment.initialize(Flavor.dev);
  runApp(const App());
}
