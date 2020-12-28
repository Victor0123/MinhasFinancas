/* eslint-disable radix */
import { Op } from 'sequelize';
import Lancamento from '../models/Lancamento';

class LancamentoController {
  async store(req, res) {
    const lancamento = await Lancamento.create(req.body);

    return res.json(lancamento);
  }

  async index(req, res) {
    const p = req.params.data.split('-');
    const ano = parseInt(p[0]);
    const mes = parseInt(p[1]) - 1;
    const datainicial = new Date(ano, mes, 1);
    const datafinal = new Date(
      datainicial.getFullYear(),
      datainicial.getMonth() + 1,
      0
    );

    const lancamentos = await Lancamento.findAll({
      where: {
        data: {
          [Op.between]: [datainicial, datafinal],
        },
      },
      attributes: ['id', 'data', 'valor', 'descricao', 'conta', 'tipo'],
    });

    return res.json(lancamentos);
  }
}

export default new LancamentoController();
