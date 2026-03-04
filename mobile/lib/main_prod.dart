import 'package:conecta_parana/app.dart';
import 'package:conecta_parana/core/config/environment.dart';
import 'package:flutter/cupertino.dart';

void main() {
  Environment.initialize(Flavor.prod);
  runApp(const App());
}
