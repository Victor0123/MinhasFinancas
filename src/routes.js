import { Router } from 'express';

import LancamentoController from './app/controllers/LancamentoController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/lancamento', LancamentoController.store);
routes.get('/lancamentos/:data', LancamentoController.index);

export default routes;
