import 'package:conectaparana/core/config/environment.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  
  group('Environment', () {
    test('URL da api injetada corretamente.', () {
      Environment.initialize(Flavor.dev);

      expect(Environment.apiBaseUrl, isNotEmpty);
    });

    test('Reflete as propriedades de ambiente baseadas no Flavor', () {
      // Teste pra DEV
      Environment.initialize(Flavor.dev);
      expect(Environment.name, 'DEV');
      expect(Environment.isDev, isTrue);

      // Teste pra PROD
      Environment.initialize(Flavor.prod);
      expect(Environment.name, 'PROD');
      expect(Environment.isDev, isFalse);
    });
  });
}