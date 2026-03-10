# Conecta Paraná

Plataforma multi-cidade para o estado do Paraná. Permite que cidadãos descubram locais, enviem sugestões e avaliações, enquanto administradores municipais e estaduais gerenciam o conteúdo pelo painel web.

## Stack

| Frente | Tecnologias |
|---|---|
| Backend | NestJS 11, TypeScript, Prisma 7, PostgreSQL 16 + PostGIS |
| Admin | Angular 21, TypeScript, Tailwind CSS, Vite |
| Mobile | Flutter 3.11+, Dart |
| Infra | Docker, GitHub Actions, GHCR |

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone git@github.com:c-s-softwares/conecta-parana.git
# ou
git clone https://github.com/c-s-softwares/conecta-parana.git

cd conecta-parana

# 2. Configure os .env (veja docs/SETUP.md para detalhes)
cp .env.example .env
cp backend/.env.example backend/.env

# 3. Suba os serviços
docker-compose up -d

# 4. Rode as migrations
cd backend && npx prisma migrate dev
```

Para o guia completo (mobile, testes, etc.), veja **[docs/SETUP.md](docs/SETUP.md)**.

## Estrutura do monorepo

```
conecta-parana/
├── backend/            # API REST — NestJS + Prisma
├── admin/              # Painel web — Angular
├── mobile/             # App mobile — Flutter
├── infra/              # Dockerfile do banco (PostGIS)
├── docs/               # Documentação do projeto
└── .github/workflows   # CI/CD pipelines
```

## Documentação

- [Setup para desenvolvedores](docs/SETUP.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Estratégia de branches](docs/BRANCHING.md)
- [CI/CD](docs/CI_CD.md)
- [Glossário de negócio](docs/BUSINESS_GLOSSARY.md)
- [Glossário técnico](docs/TECHNICAL_GLOSSARY.md)

## READMEs por frente

- [Backend](backend/README.md)
- [Admin](admin/README.md)
- [Mobile](mobile/README.md)
