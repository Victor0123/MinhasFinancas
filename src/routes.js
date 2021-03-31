import { Router } from 'express';

import LancamentoController from './app/controllers/LancamentoController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ManutencaoController from './app/controllers/ManutencaoController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/manutencao', ManutencaoController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/lancamento', LancamentoController.store);
routes.get('/lancamentos/:data', LancamentoController.index);

routes.put('/lancamento/:id', LancamentoController.update);
routes.delete('/lancamento/:id', LancamentoController.delete);

export default routes;
