import { Router } from 'express';
import Lancamento from './app/models/Lancamento';

const routes = new Router();

routes.get('/', async (req, res) => {
  const lancamento = await Lancamento.create({
    data: '01/12/2020',
    valor: 100.0,
    descricao: 'Compra XPML11',
    conta: 'NuBank',
    tipo: 'D',
  });

  return res.json(lancamento);
});

export default routes;
