import express  from 'express';
import cors from 'cors';
import { categoryController } from './controllers/categoryController';
import { technologyController } from './controllers/technologyController';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/categories', categoryController.getAll);
app.get('/api/technologies', technologyController.getAll);
app.get('/api/technologies/:id', technologyController.getById);
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`DevSetup API rodando na porta ${PORT}`);
});