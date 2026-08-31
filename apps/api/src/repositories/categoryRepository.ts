import { pool }  from '../config/database'
import { Category } from '../packages/shared'

export const categoryRepository = {

    async findAll(): Promise<Category[]> {
        const result = await pool.query<Category>('SELECT * FROM categories ORDER BY NAME ASC');
        return result.rows;
    }
}