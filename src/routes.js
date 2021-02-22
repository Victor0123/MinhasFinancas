import { Router } from 'express';

import LancamentoController from './app/controllers/LancamentoController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/');

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/lancamento', LancamentoController.store);
routes.get('/lancamentos/:data', LancamentoController.index);

export default routes;
