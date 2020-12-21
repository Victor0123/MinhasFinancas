import { Op } from 'sequelize';
import Lancamento from '../models/Lancamento';

class LancamentoController {
  async store(req, res) {
    const lancamento = await Lancamento.create(req.body);

    return res.json(lancamento);
  }

  async index(req, res) {
    const lancamentos = await Lancamento.findAll({
      where: {
        date: {
          [Op.between]: [new Date('2020 Apr 01'), new Date('2020 Apr 30')],
        },
      },
      attributes: ['id', 'data', 'valor', 'descricao', 'conta', 'tipo'],
    });

    return res.json(lancamentos);
  }
}

export default new LancamentoController();
