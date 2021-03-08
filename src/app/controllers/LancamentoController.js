import * as Yup from 'yup';
import Lancamento from '../models/Lancamento';

import LancamentoRepository from '../../database/repositories/LancamentoRepository';
import lancamentoBusiness from '../Business/lancamentoBusiness';

class LancamentoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      data: Yup.date().required(),
      valor: Yup.string().required(),
      descricao: Yup.string().required(),
      conta: Yup.string().required(),
      tipo: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na Validação.' });
    }

    const { data, valor, descricao, conta, tipo } = req.body;

    const lancamento = await Lancamento.create({
      data,
      valor,
      descricao,
      conta,
      tipo,
      user_id: req.userId,
    });

    return res.json(lancamento);
  }



  async index(req, res) {
    const p = req.params.data.split('-');
    const ano = parseInt(p[0]);
    const mes = parseInt(p[1]) - 1;

    const lancamentos = await LancamentoRepository.GetLancamentosMes(req.userId, mes, ano);

    const totalizadores = lancamentoBusiness.CalcularTotalizadores(lancamentos);

    return res.json(totalizadores);
  }
}

export default new LancamentoController();
