# DevSetup Monorepo

Este é um projeto full-stack estruturado como um **monorepo** utilizando npm workspaces. Ele contém uma API backend construída em Node.js/Express, uma aplicação frontend em React/Vite e um espaço para pacotes compartilhados, garantindo organização e reaproveitamento de código.

## 🚀 Escopo e Estrutura do Projeto

O repositório está organizado nas seguintes pastas principais:

- **`apps/api/`**: Backend da aplicação. Construído com **Express** e **TypeScript**, integrado a um banco de dados **PostgreSQL**. O ambiente de desenvolvimento utiliza o `tsx` para reload rápido.
- **`apps/web/`**: Aplicação frontend moderna e rápida, desenvolvida utilizando **React**, **Vite** e **TypeScript**. Inclui ferramentas como Axios para chamadas HTTP e bibliotecas de ícones (`lucide-react`, `react-icons`). Possui linter próprio configurado (`oxlint`).
- **`packages/shared/`**: Espaço reservado para lógicas, utilitários, tipagens e esquemas que são compartilhados entre os diferentes projetos do monorepo (como entre o Frontend e o Backend).
- **`database/`**: Contém a estrutura do banco de dados, incluindo diretórios para gerenciar as `migrations` (alterações no banco) e `seeds` (dados iniciais populados).

## 📋 Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:
- **[Node.js](https://nodejs.org/)** (v18+ recomendado)
- **[PostgreSQL](https://www.postgresql.org/)** (Rodando localmente ou via Docker)

## 🛠️ Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JM160/DevSetup.git
   cd DevSetup
   ```

2. **Instale as dependências de todos os projetos:**
   Como este é um monorepo, executar o comando abaixo na raiz instalará as bibliotecas tanto da `api` quanto do `web`.
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Certifique-se de configurar as credenciais do banco de dados no arquivo `.env` localizado na **raiz** do projeto:
   ```env
   DATABASE_URL=postgresql://postgres:SuaSenha@localhost:5432/devsetup
   ```
   *(Substitua `SuaSenha` pela sua senha real do PostgreSQL)*

## 🖥️ Modo de Uso (Desenvolvimento)

Atualmente, os projetos devem ser iniciados individualmente. Abra dois terminais:

**1. Iniciando o Backend (API):**
```bash
cd apps/api
npm run dev
```

**2. Iniciando o Frontend (Web):**
```bash
cd apps/web
npm run dev
```
O Frontend normalmente estará disponível em `http://localhost:5173`. Verifique o console para eventuais logs de acesso.

## 🔮 Futuras Alterações e Melhorias (Roadmap)

Aqui estão as funcionalidades e melhorias planejadas para a evolução do projeto:

- [ ] **Orquestração de Scripts na Raiz:** Adicionar o `concurrently` (ou a adoção do **Turborepo**) para permitir inicializar o Backend e o Frontend rodando um único comando `npm run dev` na raiz do projeto.
- [ ] **Dockerização:** Inclusão de `Dockerfile` e de um `docker-compose.yml` raiz para rodar o PostgreSQL e as aplicações em containers, padronizando o ambiente de desenvolvimento.
- [ ] **Testes:** Configuração de um ecossistema de testes unitários e de integração (usando ferramentas como Jest ou Vitest).
- [ ] **Pipelines CI/CD:** Implementação de GitHub Actions para rodar linter, testes e build automaticamente a cada Pull Request.
- [ ] **Autenticação:** Implementação completa do fluxo de login utilizando JWT e proteção de rotas no cliente React.
- [ ] **Integração Real do pacote `shared`:** Refinar e exportar tipos TS das requisições e respostas do Express e consumi-los diretamente na aplicação React.

## 📄 Licença de Uso

Este projeto está licenciado sob a licença **ISC**. 

A licença ISC é uma licença de software livre permissiva. Você tem liberdade para utilizar, copiar, modificar e distribuir este software (inclusive para fins comerciais), desde que o aviso de direitos autorais e as permissões sejam mantidos em todas as cópias do projeto.

## 📞 Contato

- **GitHub:** [JM160](https://github.com/JM160)
- **LinkedIn:** [jm160](https://www.linkedin.com/in/jm160/)
- **E-mail:** [jmatheus.andrade1507@gmail.com](mailto:jmatheus.andrade1507@gmail.com)

---

&copy; 2026 JM160. Todos os direitos reservados.