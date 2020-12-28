import { Router } from 'express';

import LancamentoController from './app/controllers/LancamentoController';

const routes = new Router();

routes.post('/lancamento', LancamentoController.store);

routes.get('/lancamentos/:data', LancamentoController.index);

export default routes;
