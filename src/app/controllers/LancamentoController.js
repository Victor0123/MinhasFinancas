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

  async delete(req, res) {
    const lancamento = await Lancamento.findByPk(req.params.id);

    if (lancamento.user_id != req.userId) {
      return res.status(401).json({ error: "Você não pode apagar esse lançamento" })
    }

    lancamento.destroy();

    await lancamento.save();

    return res.json({ message: "Lançamento deletado com sucesso" });
  }

  async update(req, res) {
    const lancamentoAtual = await Lancamento.findByPk(req.params.id);

    if (lancamentoAtual.user_id != req.userId) {
      return res.status(401).json({ error: "Você não pode alterar esse lançamento" })
    }

    lancamentoAtual.created_at = new Date();

    await lancamentoAtual.save();

    const lancamento = await lancamentoAtual.update(req.body)

    return res.json(lancamento);
  }

  async list(req, res) {
    const lancamento = await Lancamento.findByPk(req.params.id);

    if (lancamento.user_id != req.userId) {
      return res.status(401).json({ error: "O lançamento não pertence ao usuario logado" })
    }

    return res.json(lancamento);
  }

}

export default new LancamentoController();
