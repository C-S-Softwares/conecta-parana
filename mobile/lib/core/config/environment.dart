enum Flavor { dev, prod }

class Environment {
  Environment._();

  static late final Flavor flavor;

  static void initialize(Flavor f) {
    flavor = f;
  }

  static String get apiBaseUrl {
    switch (flavor) {
      case Flavor.dev:
        return 'https://api-staging.conectaparana.com.br';
      case Flavor.prod:
        return 'https://api.conectaparana.com.br';
    }
  }

  static String get name {
    switch (flavor) {
      case Flavor.dev:
        return 'DEV';
      case Flavor.prod:
        return 'PROD';
    }
  }

  static bool get isDev => flavor == Flavor.dev;
}
