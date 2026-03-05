enum Flavor { dev, prod }

class Environment {
  Environment._();

  static late Flavor flavor;
  static const _apiBaseUrl = String.fromEnvironment('API_BASE_URL');

  static void initialize(Flavor f) {
    flavor = f;
  }

  static String get apiBaseUrl {
    if (_apiBaseUrl.isNotEmpty) return _apiBaseUrl;

    const stagingUrl = 'https://api-staging.exemplo.com.br';
    const prodUrl = 'https://api.exemplo.com.br';

    return isDev ? stagingUrl : prodUrl;
  }

  static String get name => flavor.name.toUpperCase();
  static bool get isDev => flavor == Flavor.dev;
}
