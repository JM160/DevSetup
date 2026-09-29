# DevSetup

O DevSetup é um MVP para Linux que permite escolher tecnologias em uma interface web e gerar um script Bash de configuração. O usuário revisa o script e pode copiá-lo ou baixá-lo como `setup.sh` para executá-lo manualmente.

O foco atual é Ubuntu/Debian. O navegador não executa comandos na máquina do usuário, e o DevSetup ainda não é um gerenciador completo de ambientes.

## Escopo atual

- Catálogo de tecnologias organizado por categoria e carregado pela API.
- Seleção de tecnologias, geração do script, preview, cópia e download.
- Script Bash com `set -e`; quando necessário, o gerador inclui a instalação de `snapd` para tecnologias distribuídas via Snap.
- API REST com endpoints de categorias, tecnologias e geração de scripts.
- PostgreSQL com migrations SQL e catálogo inicial em seed.
- Docker Compose para executar o PostgreSQL; API e aplicação web continuam rodando localmente.
- Teste unitário do gerador configurado com Vitest.

O catálogo inclui linguagens e runtimes, frameworks, ferramentas, IDEs e aplicativos de produtividade. Entre os itens estão Node.js, Python, TypeScript, Java, C/C++, React, Vue, Angular, Git, Docker, PostgreSQL, VS Code, IDEs JetBrains, Obsidian e Notion.

Revise o conteúdo de `setup.sh` antes de executá-lo. Os comandos vêm do catálogo, mas podem usar `sudo`, instalar pacotes e configurar repositórios externos.

### Limites atuais

- O catálogo e os comandos de instalação são voltados a Ubuntu/Debian; Windows, macOS e outras distribuições não são suportados.
- A interface ainda não oferece busca, filtros ou uma lista separada de tecnologias selecionadas.
- O Compose sobe apenas o banco de dados, não a API nem a aplicação web.
- Os testes automatizados existentes cobrem o gerador de scripts; endpoints da API e interface ainda não têm testes automatizados.
- Não há pipeline CI/CD configurado.
- Autenticação, CLI, execução remota, instalação pelo navegador e gerenciamento de ambientes estão fora do escopo atual.

## Estrutura

- `apps/api/`: API em Node.js, Express e TypeScript, organizada em controllers, services, repositories e gerador de scripts; PostgreSQL via `pg`.
- `apps/web/`: interface em React, TypeScript e Vite.
- `packages/shared/`: pacote para tipos compartilhados.
- `database/migrations/` e `database/seeds/`: schema e dados iniciais em SQL.
- `docker-compose.yml`: serviço PostgreSQL 16 e inicialização do schema/catálogo.
- `docs/`: documentação de escopo, arquitetura, banco, segurança e decisões.

## Requisitos

- Node.js compatível com Vite 8 e npm.
- Docker com o plugin `docker compose`, ou PostgreSQL instalado localmente.

## Configuração local

Clone o repositório e instale as dependências na raiz:

```bash
git clone https://github.com/JM160/DevSetup.git
cd DevSetup
npm install
```

Crie um arquivo `.env` na raiz com uma senha local. O `.env` é ignorado pelo Git.

```env
DB_PASSWORD=devsetup_local
DATABASE_URL=postgresql://postgres:devsetup_local@localhost:5432/devsetup
```

Suba o banco de dados:

```bash
docker compose up -d db
```

No primeiro start, o PostgreSQL cria o schema e popula o catálogo a partir dos arquivos SQL montados em `/docker-entrypoint-initdb.d`. Esses scripts de inicialização só são executados quando o volume `devsetup_data` é criado pela primeira vez.

Para usar uma instância PostgreSQL local em vez do Compose, crie o banco `devsetup` e aplique os arquivos SQL:

```bash
createdb devsetup
psql "$DATABASE_URL" -f database/migrations/001_create_categories.sql
psql "$DATABASE_URL" -f database/migrations/002_create_technologies.sql
psql "$DATABASE_URL" -f database/seeds/seed.sql
```

O seed executa `TRUNCATE` nas tabelas antes de inserir os dados. Não o execute em um banco com dados que deseja preservar.

Para parar o banco sem remover os dados:

```bash
docker compose down
```

## Executar a aplicação

Com o PostgreSQL em execução e o `.env` configurado, inicie API e web em paralelo a partir da raiz:

```bash
npm run dev
```

Endereços locais:

- Interface: `http://localhost:5173`
- API: `http://localhost:3333`

Também é possível iniciar os serviços separadamente com `npm run dev:api` e `npm run dev:web`.

## API

| Método | Caminho | Descrição |
| --- | --- | --- |
| `GET` | `/api/categories` | Lista as categorias. |
| `GET` | `/api/technologies` | Lista as tecnologias. |
| `GET` | `/api/technologies/:id` | Consulta uma tecnologia pelo ID. |
| `POST` | `/api/scripts/generate` | Gera um script a partir dos IDs em `technologyIds`. |

Exemplo de payload para gerar um script:

```json
{
  "technologyIds": ["git", "nodejs", "python"]
}
```

## Testes e qualidade

Execute os testes do backend:

```bash
npm run test -w apps/api
```

O teste atual cobre a estrutura básica do script e a inclusão condicional de `snapd`. A aplicação web possui comandos próprios de build e lint:

```bash
npm run build -w apps/web
npm run lint -w apps/web
```

## Licença e contato

Este projeto está licenciado sob a licença ISC.

- GitHub: [JM160](https://github.com/JM160)
- LinkedIn: [jm160](https://www.linkedin.com/in/jm160/)
- E-mail: [jmatheus.andrade1507@gmail.com](mailto:jmatheus.andrade1507@gmail.com)