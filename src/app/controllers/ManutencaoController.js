import User from '../models/User';
import Lancamento from '../models/Lancamento';
import LancamentoRepository from '../../database/repositories/LancamentoRepository';
import lancamentoBusiness from '../Business/lancamentoBusiness';

class ManutencaoController {
  async index(req, res) {
    const usuarios = await User.findAll({
      attributes: ['id', 'name', 'email'],
    });
    console.log("Usuarios encontrados " + usuarios.length.toString());

    var datetime = new Date().toISOString().slice(0, 10).split('-');
    const ano = parseInt(datetime[0]);
    const mes = parseInt(datetime[1]) - 2;

    usuarios.map(async (user) => {
      const lancamentos = await LancamentoRepository.GetLancamentosMes(user.id, mes, ano);

      const totalizadores = lancamentoBusiness.CalcularTotalizadores(lancamentos);

      const total = totalizadores.Totalizadores.map((lancamento) => {
        return {
          data: new Date().toISOString().slice(0, 10),
          valor: Math.abs(lancamento.valor),
          descricao: 'saldo',
          conta: lancamento.conta,
          tipo: Math.sign(lancamento.valor) === -1 ? 'D' : 'C',
          user_id: user.id
        }
      });

      const novosLancamentos = await Lancamento.bulkCreate(total)
    });

    return res.json({ message: 'Tudo certo' });
  }
}

export default new ManutencaoController();
