import { technologyRepository } from "../repositories/technologyRepository";
import { Technology } from "../packages/shared";

export const technologyService = {
    async getAllTechnologies(): Promise<Technology[]> {
        return await technologyRepository.findAll();
    },

    async getTechnologyById(id: string): Promise<Technology | null> {
        return await technologyRepository.findById(id);
    }
};