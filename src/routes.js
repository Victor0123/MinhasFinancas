import { Router } from 'express';

import LancamentoController from './app/controllers/LancamentoController';

const routes = new Router();

routes.post('/lancamentos', LancamentoController.store);

export default routes;
