import { Router } from 'express';
import { clientController } from './controllers/clientController';

const routes = Router();

routes.post('/client', clientController.create);

export { routes };