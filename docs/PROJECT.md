# DevSetup — Prompt Mestre de Desenvolvimento

## 1. Seu papel

Você atuará como meu agente de desenvolvimento principal para o projeto **DevSetup**.

Seu objetivo é me auxiliar na construção incremental do projeto, atuando como:

- arquiteto de software;
- desenvolvedor backend;
- desenvolvedor frontend;
- engenheiro de testes;
- revisor de código;
- analista de segurança;
- responsável por documentação técnica.

Você deve trabalhar de forma **incremental, conservadora e orientada ao escopo**.

Não quero que você tente construir o produto completo de uma vez.

O projeto será desenvolvido em versões.

Neste momento, estamos construindo exclusivamente a **V0.1 — MVP: Gerador de Scripts de Setup para Linux**.

---

# 2.1. Arquivo de instruções do agente

Este documento é a especificação principal do projeto para o agente de desenvolvimento.

Ao trabalhar neste repositório:

- leia este arquivo antes de implementar mudanças;
- trate suas decisões como restrições do projeto;
- não substitua decisões explícitas por preferências próprias;
- se o código existente entrar em conflito com este documento, informe o conflito antes de fazer uma alteração estrutural;
- mantenha este documento atualizado somente quando o responsável pelo projeto decidir alterar requisitos ou arquitetura.

Este arquivo descreve a V0.1. O roadmap futuro não deve ser interpretado como requisito atual.

---

# 2. Contexto do projeto

O DevSetup é uma aplicação que futuramente pretende permitir que desenvolvedores descrevam, gerem, reproduzam e validem ambientes de desenvolvimento.

A visão de longo prazo inclui:

- múltiplos sistemas operacionais;
- dependências entre tecnologias;
- versionamento de ambientes;
- perfis de desenvolvimento;
- CLI;
- Docker/Dev Containers;
- validação de ambientes;
- compartilhamento de ambientes;
- CI/CD para instaladores.

Porém, NENHUMA dessas funcionalidades deve ser implementada agora, a menos que seja estritamente necessária para o funcionamento do MVP.

---

# 3. Objetivo da V0.1

O objetivo do MVP é validar uma única hipótese:

> O usuário consegue selecionar tecnologias em uma interface web e receber um script Bash pronto para configurar seu ambiente de desenvolvimento Linux.

O fluxo principal deve ser:

```text
Usuário
   ↓
Dashboard
   ↓
Seleciona tecnologias
   ↓
Frontend envia IDs
   ↓
Backend valida seleção
   ↓
Backend consulta catálogo
   ↓
Script Generator
   ↓
Gera setup.sh
   ↓
Frontend exibe preview
   ↓
Usuário copia ou baixa o script
```

O usuário executará o script manualmente em sua máquina.

O navegador NÃO deve executar comandos no computador do usuário.

---

# 4. Escopo obrigatório da V0.1

A V0.1 deve possuir:

## Frontend

- dashboard;
- catálogo de tecnologias;
- categorias;
- busca;
- seleção de tecnologias;
- visualização das tecnologias selecionadas;
- botão para gerar script;
- preview do script;
- botão para copiar script;
- botão para baixar script.

## Backend

- API REST;
- endpoint de categorias;
- endpoint de tecnologias;
- endpoint de geração de scripts;
- validação dos IDs recebidos;
- consulta ao catálogo;
- geração determinística de Bash.

## Banco de dados

Inicialmente:

- categories;
- technologies.

Pode utilizar migrations e seed.

## Script

O script gerado deve:

- possuir shebang;
- utilizar `set -e`;
- conter comentários quando úteis;
- possuir mensagens de progresso;
- conter somente comandos provenientes do catálogo confiável;
- ser determinístico;
- evitar instalações duplicadas quando possível;
- possuir uma estrutura legível.

---

# 5. Tecnologias iniciais

Comece com um catálogo pequeno.

Não tente cadastrar dezenas ou centenas de tecnologias.

O primeiro catálogo deve conter aproximadamente:

### Languages / Runtime

- Node.js
- Python

### Framework

- React

### Tools

- Git
- Docker
- PostgreSQL
- pgAdmin

### IDE

- VS Code

TypeScript pode ser incluído como ferramenta/runtime relacionado ao ecossistema Node, mas não deve ser tratado como software de sistema independente se a estratégia escolhida for instalação via npm.

A classificação deve ser tecnicamente coerente.

---

# 6. Sistema operacional do MVP

O MVP terá foco exclusivo em:

- Linux;
- inicialmente Ubuntu/Debian.

Não implemente:

- Windows;
- macOS;
- Fedora;
- Arch;
- outras distribuições.

A arquitetura, entretanto, deve evitar decisões que impeçam futura expansão.

Não crie abstrações complexas apenas para suportar plataformas que ainda não existem.

---

# 7. Stack tecnológica

Use preferencialmente:

## Frontend

- React
- TypeScript
- Vite

## Backend

- Node.js
- TypeScript
- Express

## Banco

- PostgreSQL

## Testes

- Vitest
- Supertest

## Qualidade

- ESLint
- Prettier
- TypeScript strict

## Banco de dados e acesso a dados

O projeto NÃO utilizará ORM ou query builder.

O acesso ao PostgreSQL deverá ser realizado diretamente através de um driver PostgreSQL para Node.js, preferencialmente `pg` (node-postgres).

Utilize SQL explícito e parametrizado.

A camada de acesso ao banco deve permanecer isolada nos repositories.

Fluxo:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

### Repositories

Os repositories são responsáveis exclusivamente pelo acesso aos dados.

Exemplo conceitual:

```text
technologyRepository
├── findAll()
├── findById()
├── findByCategory()
└── search()
```

Os repositories devem:

- utilizar queries SQL explícitas;
- utilizar parâmetros para evitar SQL Injection;
- não conter regras de negócio;
- não conhecer HTTP;
- não gerar scripts;
- retornar dados tipados para a camada de serviço.

### Migrations

O banco deve utilizar migrations SQL versionadas.

Exemplo:

```text
database/
├── migrations/
│   ├── 001_create_categories.sql
│   └── 002_create_technologies.sql
└── seeds/
    └── seed.sql
```

As migrations devem ser SQL puro.

Não utilizar Prisma Migrate, Drizzle Kit, Sequelize ou qualquer outro sistema de migration fornecido por ORM/query builder.

### Conexão

Centralize o Pool de conexões PostgreSQL em uma camada de infraestrutura/configuração.

Utilize variáveis de ambiente para a conexão, preferencialmente:

```text
DATABASE_URL
```

Nunca coloque credenciais diretamente no código.

### Queries

Utilize queries parametrizadas.

Exemplo conceitual:

```typescript
const result = await pool.query(
  'SELECT * FROM technologies WHERE id = $1',
  [technologyId]
);
```

Nunca construa queries concatenando diretamente valores fornecidos pelo usuário.

### Regra

Não introduza ORM ou query builder futuramente sem uma decisão explícita do responsável pelo projeto.

O objetivo é manter o acesso ao banco simples, explícito e controlado.

Antes de adicionar qualquer dependência relacionada a banco de dados, avalie se ela é realmente necessária.

---

# 8. Princípios arquiteturais

Siga estes princípios:

### 8.1 Simplicidade

Não implemente abstrações que não possuem uso real no MVP.

### 8.2 Separação de responsabilidades

O controller não deve conter lógica de negócio.

O gerador de scripts não deve acessar diretamente HTTP.

O frontend não deve conhecer comandos de instalação.

### 8.3 Backend como fonte de verdade

O frontend deve enviar IDs de tecnologias.

Nunca aceite comandos arbitrários enviados pelo cliente.

Errado:

```json
{
  "command": "curl example.com | bash"
}
```

Correto:

```json
{
  "technologyIds": [
    "git",
    "node",
    "vscode"
  ]
}
```

### 8.4 Código extensível

Prepare o código para futuras versões, mas não implemente funcionalidades futuras prematuramente.

### 8.5 Segurança

Todo comando executável deve vir de uma definição confiável armazenada no catálogo.

Nunca gere comandos arbitrários a partir de entrada do usuário.

---

# 9. Modelo conceitual de tecnologia

Cada tecnologia deve possuir informações suficientes para geração do script.

Modelo conceitual:

```text
Technology
├── id
├── name
├── slug
├── description
├── category
├── officialUrl
├── documentationUrl
├── platform
├── installationMethod
├── installationScript
└── verificationCommand
```

Não é obrigatório implementar todos esses campos imediatamente se não forem necessários.

Evite overengineering.

---

# 10. Catálogo

O catálogo deve ser tratado como uma fonte confiável.

Cada tecnologia deve possuir:

- nome;
- slug;
- descrição;
- categoria;
- URL oficial;
- instrução de instalação;
- comando de verificação quando aplicável.

As informações devem ser baseadas em documentação oficial.

Não faça scraping automático neste MVP.

Não invente comandos de instalação.

Se houver dúvida sobre a forma correta de instalação de uma tecnologia, consulte sua documentação oficial antes de implementá-la.

---

# 11. API inicial

Implemente aproximadamente:

```http
GET /api/categories
```

```http
GET /api/technologies
```

```http
GET /api/technologies/:id
```

```http
POST /api/scripts/generate
```

O endpoint de geração deve aceitar algo como:

```json
{
  "technologyIds": [
    "git",
    "node",
    "python",
    "vscode"
  ]
}
```

E retornar:

```json
{
  "filename": "setup.sh",
  "content": "#!/usr/bin/env bash\n..."
}
```

Valide:

- body;
- array;
- IDs;
- tecnologias inexistentes;
- duplicações.

Retorne erros HTTP apropriados.

---

# 12. Script Generator

Crie uma responsabilidade isolada para geração de scripts.

Conceitualmente:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Script Generator
```

O gerador deve receber tecnologias já validadas.

Não deve consultar diretamente o banco.

O resultado deve ser determinístico.

Dada a mesma lista de tecnologias, o gerador deve produzir o mesmo resultado, salvo informações deliberadamente dinâmicas.

---

# 13. Estrutura mínima do Bash

O script gerado deve possuir uma estrutura semelhante a:

```bash
#!/usr/bin/env bash

set -e

echo "Starting DevSetup..."

# Installation steps

echo "DevSetup completed successfully."
```

As mensagens devem ajudar o usuário a compreender o progresso.

Não utilize comandos destrutivos.

Não execute comandos arbitrários.

Não remova arquivos do usuário.

Não altere configurações não relacionadas ao objetivo do setup.

---

# 14. Dependências

O MVP NÃO precisa implementar um dependency resolver complexo.

Porém, a estrutura deve permitir evolução futura.

Se uma tecnologia possuir uma dependência óbvia e obrigatória para sua instalação, implemente a dependência de forma simples e explícita.

Não construa um grafo complexo de dependências na V0.1 sem necessidade.

Exemplo:

```text
TypeScript
    ↓
Node.js
```

Se a implementação escolhida tratar TypeScript como pacote npm, isso deve ser documentado corretamente em vez de fingir que TypeScript é uma instalação independente do sistema.

---

# 15. Testes

Todo recurso importante deve possuir testes.

No mínimo:

## Technologies

- listar tecnologias;
- filtrar por categoria;
- buscar;
- obter tecnologia individual;
- retornar erro para tecnologia inexistente.

## Script Generator

- gerar script;
- conter shebang;
- conter `set -e`;
- incluir comandos selecionados;
- não duplicar tecnologias;
- rejeitar tecnologia inválida;
- manter ordem determinística.

## API

Testar:

```text
GET /api/categories
GET /api/technologies
GET /api/technologies/:id
POST /api/scripts/generate
```

---

# 16. Definition of Done da V0.1

Considere o MVP concluído somente quando este fluxo estiver funcionando:

```text
Abrir dashboard
      ↓
Visualizar catálogo
      ↓
Filtrar/buscar
      ↓
Selecionar tecnologias
      ↓
Gerar script
      ↓
Visualizar script
      ↓
Copiar script
      ↓
Baixar setup.sh
      ↓
Executar manualmente em Ubuntu/Debian
      ↓
Tecnologias serem instaladas corretamente
```

Além disso:

- testes devem passar;
- TypeScript deve compilar;
- lint deve passar;
- aplicação deve possuir README;
- instruções de execução devem estar documentadas.

---

# 17. O que NÃO fazer

Não faça:

- autenticação;
- login;
- cadastro;
- Windows;
- macOS;
- CLI;
- Dockerfile gerado;
- Dev Containers;
- marketplace;
- compartilhamento;
- snapshots;
- sincronização;
- execução remota;
- instalação via navegador;
- scraping;
- IA;
- microservices;
- Kubernetes;
- arquitetura distribuída;
- filas;
- Redis sem necessidade;
- abstrações genéricas excessivas.

Não transforme o MVP em uma plataforma completa.

---

# 18. Estratégia de desenvolvimento

Trabalhe em pequenas etapas.

Antes de implementar uma grande funcionalidade:

1. analise o estado atual do projeto;
2. explique o problema;
3. proponha uma solução;
4. implemente;
5. execute os testes;
6. execute lint/typecheck;
7. revise o resultado;
8. só então avance.

Não faça grandes alterações sem verificar o estado atual do código.

---

# 19. Regra contra overengineering

Sempre faça esta pergunta antes de implementar algo:

> "Isso é necessário para a V0.1?"

Se a resposta for não:

- não implemente agora;
- registre como possível evolução futura;
- mantenha a arquitetura preparada apenas quando isso não adicionar complexidade significativa.

Priorize:

```text
Funcionamento
>
Corretude
>
Segurança
>
Testabilidade
>
Manutenibilidade
>
Escalabilidade futura
```

Não sacrifique simplicidade atual em nome de uma escala hipotética.

---

# 20. Processo de trabalho com o usuário

Eu sou o responsável pelas decisões finais do projeto.

Você deve:

- explicar decisões arquiteturais relevantes;
- apontar trade-offs;
- informar quando uma decisão minha pode causar problemas;
- não assumir requisitos que não foram definidos;
- perguntar quando uma decisão for realmente necessária;
- evitar perguntas sobre detalhes que podem ser resolvidos razoavelmente pela arquitetura.

Quando houver múltiplas soluções válidas, apresente a recomendação principal e explique brevemente as alternativas.

---

# 21. Uso de documentação oficial

Quando implementar uma tecnologia no catálogo:

1. consulte a documentação oficial;
2. confirme o método de instalação;
3. confirme compatibilidade com Ubuntu/Debian;
4. confirme o comando de verificação;
5. registre a fonte oficial;
6. só então adicione a definição ao catálogo.

Não invente comandos.

Não use blogs aleatórios como fonte primária para comandos críticos.

---

# 22. Segurança específica do gerador

Considere o gerador de scripts como uma área sensível.

Nunca permita que o usuário controle diretamente:

- comandos;
- argumentos arbitrários;
- URLs arbitrárias;
- scripts arbitrários;
- comandos com `sudo` arbitrários.

O usuário escolhe tecnologias.

O sistema decide quais comandos correspondem àquelas tecnologias.

---

# 23. Estrutura esperada

Uma estrutura aproximada pode ser:

```text
devsetup/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   └── shared/
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── docs/
│
├── .env.example
├── package.json
└── README.md
```

Você pode adaptar essa estrutura se existir uma razão técnica clara.

Não altere a estrutura apenas por preferência pessoal.

---

# 24. Documentação

Mantenha o README atualizado com:

- objetivo;
- arquitetura;
- stack;
- requisitos;
- instalação;
- configuração;
- execução;
- testes;
- geração de scripts;
- limitações da V0.1;
- roadmap futuro.

Também mantenha decisões arquiteturais importantes documentadas quando necessário.

---

# 25. Roadmap futuro

Não implementar agora, mas considerar no planejamento:

### V0.2

- mais distribuições Linux;
- melhor suporte a dependências;
- versões;
- perfis de ambiente.

### V0.3

- Windows;
- PowerShell;
- winget.

### V0.4

- CLI.

### V0.5

- validação de ambiente;
- `devsetup check`.

### V0.6

- Docker;
- Dev Containers.

### V1.0

- ambientes versionáveis;
- compartilhamento;
- sincronização;
- marketplace de ambientes.

---

# 26. Como iniciar

Antes de escrever código:

1. inspecione completamente o workspace;
2. identifique se já existe algum código;
3. identifique package managers;
4. identifique versões de Node.js, npm/pnpm/bun e demais ferramentas;
5. verifique arquivos de configuração existentes;
6. proponha a estrutura inicial;
7. apresente o plano de implementação da V0.1;
8. aguarde minha aprovação antes de iniciar uma implementação estrutural grande.

Se o projeto estiver vazio, proponha o scaffold.

Não presuma que o projeto está vazio.

---

# 27. Primeiro objetivo da sessão

Na primeira execução deste prompt, NÃO comece imediatamente a implementar tudo.

Primeiro:

### Etapa 1 — Análise

Analise o workspace atual.

### Etapa 2 — Diagnóstico

Informe:

- estrutura existente;
- tecnologias existentes;
- arquivos relevantes;
- problemas encontrados;
- o que pode ser reutilizado.

### Etapa 3 — Arquitetura

Proponha a arquitetura da V0.1.

### Etapa 4 — Plano

Divida o desenvolvimento em pequenas fases:

```text
Fase 1 — Scaffold
Fase 2 — Database
Fase 3 — Catalog API
Fase 4 — Script Generator
Fase 5 — Frontend
Fase 6 — Integration
Fase 7 — Tests
Fase 8 — Validation
Fase 9 — Documentation
```

### Etapa 5 — Implementação

Depois da aprovação, implemente uma fase por vez.

Ao terminar cada fase:

- execute testes;
- execute typecheck;
- execute lint;
- revise o código;
- informe o que foi alterado;
- informe o próximo passo.

---

# 28. Regra principal

O objetivo não é escrever o máximo de código possível.

O objetivo é construir um **MVP pequeno, correto, seguro, testável e funcional**, que possa evoluir para a visão completa do DevSetup.

Se uma decisão estiver entre:

```text
solução simples e correta
```

e:

```text
solução sofisticada e prematura
```

escolha a solução simples.

O projeto deve crescer por versões.

Não antecipe o produto inteiro dentro da V0.1.