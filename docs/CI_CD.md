# CI/CD

Todos os workflows estão em `.github/workflows/`.

## Pipelines de CI

Executados automaticamente em **Pull Requests para `main`**, filtrados por path.

### ci-backend.yml

Trigger: PR → main (paths: `backend/**`)

| Job | O que faz |
|---|---|
| **lint** | Roda `npm run lint` (ESLint) |
| **test-unit** | Roda `npm run test -- --coverage` (Jest) |
| **test-e2e** | Sobe um container PostGIS 16, roda migrations e executa `npm run test:e2e`. Depende de lint e test-unit passarem. |

### ci-admin.yml

Trigger: PR → main (paths: `admin/**`)

| Job | O que faz |
|---|---|
| **lint** | Roda `npm run lint` (ESLint) |
| **test-unit** | Roda `npm run test -- --no-watch --coverage` |

### ci-mobile.yml

Trigger: PR → main (paths: `mobile/**`)

| Job | O que faz |
|---|---|
| **lint** | Roda `flutter analyze --fatal-infos` |
| **test-unit** | Roda `flutter test` com `--dart-define=API_BASE_URL` |

## Pipelines de Deploy

### deploy-staging.yml — Deploy manual

Trigger: **workflow_dispatch** (manual) com seleção de target: `backend`, `admin`, `mobile` ou `todas`.

| Job | O que faz | Condição |
|---|---|---|
| **deploy-db** | Build da imagem PostGIS (arm64), push para GHCR com tag `:staging`, deploy via SSH | target = backend ou todas |
| **deploy-backend** | Build do backend (arm64), push GHCR, deploy SSH + roda `prisma migrate deploy` | target = backend ou todas (depende de deploy-db) |
| **deploy-admin** | Build do admin (arm64) com `ENVIRONMENT=staging`, push GHCR, deploy SSH | target = admin ou todas |
| **build-mobile** | Build APK flavor `dev` apontando para `api-staging.conectaparana.com.br`, cria GitHub pre-release | target = mobile ou todas |

### deploy-production.yml — Deploy automático

Trigger: **push na branch `main`** (ou seja, ao mergear um PR).

| Job | O que faz |
|---|---|
| **deploy-db** | Build PostGIS (arm64), push GHCR com tags `:latest` e `:sha`, deploy SSH |
| **deploy-backend** | Build backend, push GHCR, deploy SSH + migrations (depende de deploy-db) |
| **deploy-admin** | Build admin com `ENVIRONMENT=production`, push GHCR, deploy SSH |
| **build-mobile** | Build APK flavor `prod` apontando para `api.conectaparana.com.br`, cria GitHub release |

## Como fazer deploy manual para staging

1. Acesse o repositório no GitHub
2. Vá em **Actions** → **Deploy Staging** (menu lateral esquerdo)
3. Clique em **Run workflow**
4. Selecione o target desejado (`backend`, `admin`, `mobile` ou `todas`)
5. Clique em **Run workflow** (botão verde)
6. Acompanhe o progresso na lista de runs

## Como funciona o deploy automático para produção

Ao mergear um PR na `main`, o workflow `deploy-production.yml` é disparado automaticamente. Ele faz build de todas as imagens, publica no GHCR e deploya via SSH no servidor de produção. O APK de produção é publicado como GitHub release.
