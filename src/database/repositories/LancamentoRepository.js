import { Op } from 'sequelize';
import Lancamento from '../../app/models/Lancamento';

class LancamentoRepository {
  static GetLancamentosMes(userId, mes, ano) {
    const datainicial = new Date(ano, mes, 1);
    const datafinal = new Date(
      datainicial.getFullYear(),
      datainicial.getMonth() + 1,
      0
    );

    return Lancamento.findAll({
      where: {
        user_id: userId,
        data: {
          [Op.between]: [datainicial, datafinal],
        },
      },
      attributes: ['id', 'data', 'valor', 'descricao', 'conta', 'tipo'],
    });
  }
};

export default LancamentoRepository;
