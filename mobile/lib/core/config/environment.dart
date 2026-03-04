enum Flavor { dev, prod }

class Environment {
  Environment._();

  static late Flavor flavor;
  static const _apiBaseUrl = String.fromEnvironment('API_BASE_URL');

  static void initialize(Flavor f) {
    flavor = f;

    assert(apiBaseUrl.isNotEmpty, '[ERRO]: URL não definida nas configurações de ambiente');
  }

  static String get apiBaseUrl => _apiBaseUrl;
  static String get name => flavor.name.toUpperCase();
  static bool get isDev => flavor == Flavor.dev;
}
