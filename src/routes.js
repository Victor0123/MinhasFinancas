import { Router } from 'express';

import LancamentoController from './app/controllers/LancamentoController.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';

import authMiddleware from './app/middlewares/auth.js';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/lancamento', LancamentoController.store);
routes.get('/lancamentos/:data', LancamentoController.index);

export default routes;
