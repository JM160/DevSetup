import express  from 'express';
import cors from 'cors';
import { categoryController } from './controllers/categoryController';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/categories', categoryController.getAll);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`DevSetup API rodando na porta ${PORT}`);
});