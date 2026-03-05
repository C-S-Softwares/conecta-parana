import 'package:conectaparana/app.dart';
import 'package:conectaparana/core/config/environment.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
    IntegrationTestWidgetsFlutterBinding.ensureInitialized();
    const appTitle = 'Conecta Paraná';

    testWidgets('App', (WidgetTester tester) async {
        Environment.initialize(Flavor.dev);

        await tester.pumpWidget(const App());
        await tester.pumpAndSettle();
        final materialApp = tester.widget<MaterialApp>(find.byType(MaterialApp));
        expect(materialApp.title, appTitle);
    });
}
