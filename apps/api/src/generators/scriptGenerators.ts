import { Technology } from "../packages/shared";

export const scriptGenerator = {
    generate(technologies: Technology[]): string {
        let script = `#!/usr/bin/env bash\n\n`;
        script += `set -e\n\n`;
        script += `echo "Starting DevSetup..."\n\n`;

        const requiresSnap = technologies.some(tech =>
            tech.installation_script.includes('snap')
        );

        if(requiresSnap) {
            script += "# Instalando a dependência snapd\n";
            script += "sudo apt-get update && sudp apt-get install -y snapd\n\n";
        }

        for(const tech of technologies) {
            script += `#Instalação: ${tech.name}\n`;
            script += `echo "Configurando ${tech.name}..."\n`;
            script += `${tech.installation_script}\n\n`;
        }

        script += `echo "DevSetup completed sucessfully."\n`;
        return script;
    }
};