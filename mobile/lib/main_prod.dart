import 'package:conectaparana/app.dart';
import 'package:conectaparana/core/config/environment.dart';
import 'package:flutter/material.dart';

void main() {
  Environment.initialize(Flavor.prod);
  runApp(const App());
}
