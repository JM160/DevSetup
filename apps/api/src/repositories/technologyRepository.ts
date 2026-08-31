import { pool } from "../config/database";
import { Technology } from "../packages/shared";

export const technologyRepository = {
    async findAll(): Promise<Technology[]> {
        const result = await pool.query<Technology>('SELECT * FROM technologies ORDER BY name ASC');
        return result.rows;
    },
    async findById(id: string): Promise<Technology | null> {
        const result = await pool.query<Technology>('SELECT * FROM technologies WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
};

