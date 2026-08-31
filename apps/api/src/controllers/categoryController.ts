import { Request, Response } from "express";
import { Category } from "../packages/shared";
import { categoryService } from "../services/categoryService";

export const categoryController = {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        }catch(error){
            console.error('Erro ao buscar categorias:', error);
            res.status(500).json({error: 'Erro interno no servidor'});
        }
    }
}