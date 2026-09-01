import { Request, Response } from "express";
import { scriptService } from "../services/scriptService";

export const scriptController = {
    async generate(req: Request, res: Response): Promise<void> {
        try {
            const {technologyIds} = req.body;

            if(!technologyIds || !Array.isArray(technologyIds) || technologyIds.length === 0) {
                res.status(400).json({error: 'O payload deve conter um array válido e não vazio de technologyIds.'});
                return;
            }

            const result = await scriptService.generateScript(technologyIds);
            res.json(result);
        }catch (error: any) {
            console.error('Erro na geração do script:', error);

            if(error.message.startsWith('Tecnologia inválida')) {
                res.status(400).json({error: error.message});
                return;
            }

            res.status(500).json({error: 'Erro interno no servidor'});
        }
    }
};