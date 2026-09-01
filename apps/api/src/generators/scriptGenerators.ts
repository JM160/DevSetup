import { Technology } from "../packages/shared";

export const scriptGenerator = {
    generate(technologies: Technology[]): string {
        let script = `#!/usr/bin/env bash\n\n`;
        script += `set -e\n\n`;
        script += `echo "Starting DevSetup..."\n\n`;

        for(const tech of technologies) {
            script += `#Instalação: ${tech.name}`;
            script += `echo "Configurando ${tech.name}..."\n`;
            script += `${tech.installation_script}\n\n`;
        }

        script += `echo "DevSetup completed sucessfully."\n`;
        return script;
    }
};