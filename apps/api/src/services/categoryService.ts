import { categoryRepository } from "../repositories/categoryRepository";
import { Category } from "../packages/shared";

export const categoryService = {
    async getAllCategories(): Promise<Category[]> {
        return await categoryRepository.findAll()
    }
}