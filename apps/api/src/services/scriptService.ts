import { technologyRepository } from "../repositories/technologyRepository";
import { scriptGenerator } from "../generators/scriptGenerators";
import { GenerateScriptResponse, Technology } from "../packages/shared";

export const scriptService = {
    async generateScript(technologyIds: string[]): Promise<GenerateScriptResponse> {
        const uniqueIds = Array.from(new Set(technologyIds));
        const technologies = [];

        for (const id of uniqueIds) {
            const tech = await technologyRepository.findById(id);
            if (!tech) {
                throw new Error(`Tecnologia inválida ou não econtrada: ${id}`);
            }
            technologies.push(tech);
        }

        technologies.sort((a, b) => a.name.localeCompare(b.name));

        const content = scriptGenerator.generate(technologies);

        return {
            filename: 'setup.sh',
            content
        };
    }
};