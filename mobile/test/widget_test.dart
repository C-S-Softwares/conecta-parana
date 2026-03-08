// Este é um teste básico de widget Flutter.
//
// Para interagir com um widget em seu teste, use o utilitário WidgetTester
// do pacote flutter_test. Por exemplo, você pode enviar gestos de toque e
// rolagem. Você também pode usar WidgetTester para encontrar widgets filhos
// na árvore de widgets, ler texto e verificar que os valores das propriedades
// do widget estão corretos.

import 'package:flutter/material.dart';
import 'package:conectaparana/core/config/environment.dart';
import 'package:conectaparana/shared/widgets/placeholder_screen.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Tela placeholder exibe nome do app e ambiente.', (WidgetTester tester) async {
    // 1. Inicia o app em ambiente de desenvolvimento.
    Environment.initialize(Flavor.dev);

    // 2. Constrói nosso app e dispara um frame.
    await tester.pumpWidget(
      const MaterialApp(
        home: PlaceholderScreen(),
      ),
    );

    // 3. Verifica se o nosso header e título estão na tela, perceba que o Matcher chamado é findsWidgets, isso significa
    // que pode existir mais de um texto igual.
    expect(find.text('Conecta Paraná'), findsWidgets);

    // 3.1. Verifica se o Ambiente e a Url da API de desenvolvimento estão na tela.
    expect(find.text('Ambiente: DEV'), findsOneWidget);
    expect(find.text(Environment.apiBaseUrl), findsOneWidget);

    // Exemplos de utilização do WidgetTester:
    // await tester.tap(find.byIcon(Icons.add));
    // await tester.pump();
  });
}
