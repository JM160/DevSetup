import { Request, Response } from "express";
import { technologyService } from "../services/technologyService";


export const technologyController = {
    async getAll(req: Request, res: Response): Promise<void> {
        try{
            const technologies = await technologyService.getAllTechnologies();
            res.json(technologies);
        }catch(error){
            console.error('Erro ao buscar tecnologias:', error);
            res.status(500).json({error: 'Erro interno do servidor'});
        }
    },

    async getById(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        if(!id || typeof id !== 'string' || Array.isArray(id)) {
            res.status(400).json({error: 'ID de tecnologia inválido'});
            return;
        }

        try{    
            const technology = await technologyService.getTechnologyById(id);

            if(!technology) {
                res.status(404).json({error: 'Tecnologia não encontrada'});
                return;
            }

            res.json(technology);
        }catch(error){
            console.error('Erro ao buscar tecnologia por ID:', error);
            res.status(500).json({error: 'Erro interno do servidor'});
        }
    }
}