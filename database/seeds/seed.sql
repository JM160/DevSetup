-- Limpa os dados existentes para evitar duplicação caso rode o seed mais de uma vez
TRUNCATE TABLE technologies, categories CASCADE;

-- Inserindo as Categorias Iniciais
INSERT INTO categories (id, name, description) VALUES
('languages', 'Languages / Runtime', 'Linguagens de programação e ambientes de execução'),
('frameworks', 'Framework', 'Bibliotecas e frameworks de desenvolvimento'),
('tools', 'Tools', 'Ferramentas de linha de comando, bancos de dados e utilitários'),
('ides', 'IDE', 'Ambientes de Desenvolvimento Integrado');

-- Inserindo as Tecnologias (focadas em Ubuntu/Debian)
INSERT INTO technologies (id, category_id, name, description, official_url, installation_script, verification_command) VALUES
('nodejs', 'languages', 'Node.js', 'Ambiente de execução JavaScript (via NodeSource)', 'https://nodejs.org', 'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs', 'node -v'),
('python', 'languages', 'Python', 'Linguagem de programação Python 3', 'https://www.python.org', 'sudo apt-get update && sudo apt-get install -y python3 python3-pip', 'python3 --version'),
('react', 'frameworks', 'React', 'Biblioteca JavaScript para interfaces de usuário', 'https://reactjs.org', 'echo "React é instalado via npm/npx/vite. Garantindo que o Node.js está presente..."', 'npx -v'),
('git', 'tools', 'Git', 'Sistema de controle de versão distribuído', 'https://git-scm.com', 'sudo apt-get update && sudo apt-get install -y git', 'git --version'),
('docker', 'tools', 'Docker', 'Plataforma de containers', 'https://www.docker.com', 'sudo apt-get update && sudo apt-get install -y docker.io && sudo systemctl enable --now docker', 'docker --version'),
('postgresql', 'tools', 'PostgreSQL', 'Sistema de banco de dados relacional', 'https://www.postgresql.org', 'sudo apt-get update && sudo apt-get install -y postgresql postgresql-contrib', 'psql --version'),
('pgadmin', 'tools', 'pgAdmin', 'Plataforma de administração para PostgreSQL', 'https://www.pgadmin.org', 'echo "Instalando via curl..." && curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg && sudo sh -c ''echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'' && sudo apt update && sudo apt install -y pgadmin4-desktop', 'pgadmin4 --version'),
('vscode', 'ides', 'VS Code', 'Editor de código da Microsoft', 'https://code.visualstudio.com', 'sudo apt-get update && sudo apt-get install -y wget gpg && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg && sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg && sudo sh -c ''echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'' && rm -f packages.microsoft.gpg && sudo apt install -y apt-transport-https && sudo apt update && sudo apt install -y code', 'code --version');

-- 1. Criando uma nova categoria para Produtividade (se desejar separar o Obsidian)
INSERT INTO categories (id, name, description) 
VALUES ('productivity', 'Produtividade', 'Ferramentas de anotações e gestão do dia a dia');

-- 2. Inserindo as novas Tecnologias
INSERT INTO technologies (id, category_id, name, description, official_url, installation_script, verification_command) VALUES

-- Linguagens
('typescript', 'languages', 'TypeScript', 'Superset tipado do JavaScript (inclui o executor tsx)', 'https://www.typescriptlang.org/', 'npm install -g typescript tsx', 'tsc --version'),
('cpp', 'languages', 'C / C++', 'Compiladores GCC e ferramentas essenciais (build-essential)', 'https://gcc.gnu.org/', 'sudo apt-get update && sudo apt-get install -y build-essential', 'g++ --version'),
('java', 'languages', 'Java (OpenJDK)', 'Kit de desenvolvimento Java padrão (JDK)', 'https://openjdk.org/', 'sudo apt-get update && sudo apt-get install -y default-jdk', 'java -version'),

-- Produtividade
('obsidian', 'productivity', 'Obsidian', 'Base de conhecimento e anotações em Markdown (via Snap)', 'https://obsidian.md/', 'sudo snap install obsidian --classic', 'snap list | grep obsidian'),

-- IDEs
('intellij', 'ides', 'IntelliJ IDEA Community', 'IDE da JetBrains focada em ecossistema Java (via Snap)', 'https://www.jetbrains.com/idea/', 'sudo snap install intellij-idea-community --classic', 'snap list | grep intellij'),
('pycharm', 'ides', 'PyCharm Community', 'IDE da JetBrains focada em Python (via Snap)', 'https://www.jetbrains.com/pycharm/', 'sudo snap install pycharm-community --classic', 'snap list | grep pycharm');

-- Inserindo as novas tecnologias (Linguagens, Frameworks, IDEs e Produtividade)
INSERT INTO technologies (id, category_id, name, description, official_url, installation_script, verification_command) VALUES

-- Linguagens
('kotlin', 'languages', 'Kotlin', 'Linguagem moderna e concisa da JetBrains (via Snap)', 'https://kotlinlang.org/', 'sudo snap install kotlin --classic', 'kotlin -version'),
('csharp', 'languages', 'C# (.NET 8)', 'SDK do .NET para desenvolvimento em C# no Linux', 'https://learn.microsoft.com/pt-br/dotnet/csharp/', 'sudo apt-get update && sudo apt-get install -y dotnet-sdk-8.0', 'dotnet --version'),

-- Frameworks Web e Backend
('springboot', 'frameworks', 'Spring Boot CLI', 'Ferramenta de linha de comando para Spring Boot (via SDKMAN)', 'https://spring.io/projects/spring-boot', 'curl -s "https://get.sdkman.io" | bash && bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install springboot"', 'spring --version'),
('vuejs', 'frameworks', 'Vue.js CLI', 'Interface de linha de comando oficial para Vue.js', 'https://vuejs.org/', 'npm install -g @vue/cli', 'vue --version'),
('nextjs', 'frameworks', 'Next.js (create-next-app)', 'CLI para inicializar projetos React com Next.js', 'https://nextjs.org/', 'npm install -g create-next-app', 'create-next-app --version'),
('nestjs', 'frameworks', 'NestJS CLI', 'Framework Node.js progressivo para backend', 'https://nestjs.com/', 'npm install -g @nestjs/cli', 'nest --version'),
('angular', 'frameworks', 'Angular CLI', 'Ferramenta de linha de comando do ecossistema Angular', 'https://angular.io/', 'npm install -g @angular/cli', 'ng version'),
('django', 'frameworks', 'Django', 'Framework web de alto nível para Python', 'https://www.djangoproject.com/', 'sudo apt-get install -y python3-pip && pip3 install django', 'django-admin --version'),
('laravel', 'frameworks', 'Laravel Installer', 'Instalador global do framework PHP Laravel', 'https://laravel.com/', 'sudo apt-get install -y php-cli composer && composer global require laravel/installer', 'laravel --version'),

-- IDEs, CLIs e Produtividade
('eclipse', 'ides', 'Eclipse IDE', 'IDE clássica voltada para desenvolvimento Java (via Snap)', 'https://www.eclipse.org/', 'sudo snap install eclipse --classic', 'snap list | grep eclipse'),
('cursor', 'ides', 'Cursor', 'O editor de código potencializado por IA (via AppImage)', 'https://cursor.sh/', 'curl -fsSL https://downloader.cursor.sh/linux/appImage/x64 -o ~/cursor.AppImage && chmod +x ~/cursor.AppImage', 'ls ~/cursor.AppImage'),
('antigravity', 'tools', 'Antigravity CLI', 'Ferramenta de linha de comando para automação', 'https://github.com/', 'npm install -g antigravity-cli', 'antigravity --version'),
('notion', 'productivity', 'Notion', 'Espaço de trabalho para notas e tarefas (via Snap)', 'https://www.notion.so/', 'sudo snap install notion-snap', 'snap list | grep notion');