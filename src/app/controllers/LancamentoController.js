import { Op } from 'sequelize';
import * as Yup from 'yup';
import Lancamento from '../models/Lancamento.js';

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
    const datainicial = new Date(ano, mes, 1);
    const datafinal = new Date(
      datainicial.getFullYear(),
      datainicial.getMonth() + 1,
      0
    );

    const lancamentos = await Lancamento.findAll({
      where: {
        user_id: req.userId,
        data: {
          [Op.between]: [datainicial, datafinal],
        },
      },
      attributes: ['id', 'data', 'valor', 'descricao', 'conta', 'tipo'],
    });
    // Encontra as contas unicas na lista de lancamentos
    const contas = new Set();
    lancamentos.forEach((el) => {
      contas.add(el.conta);
    });

    // Constroi os totalizadores
    // Filter - filtra os lancamentos por conta
    // Reduce - soma todos os lancamentos filtrados por conta
    const totalizadores = [];
    contas.forEach((conta) => {
      const valor = lancamentos
        .filter((el) => el.conta === conta)
        .reduce((anterior, elem) => {
          let valor = parseFloat(elem.valor);
          if (elem.tipo === 'D') {
            valor *= -1;
          }
          return anterior + valor;
        }, 0);

      // constroi um novo objeto
      totalizadores.push({ conta, valor });
    });

    const saldo = totalizadores
      .reduce((anterior, elem) => {
        let valor = parseFloat(elem.valor);
        return anterior + valor
      }, 0);

    totalizadores.push(
      {
        conta: 'Saldo',
        valor: saldo,
      });

    // constroi o objeto de retorno final
    const retorno = {
      Totalizadores: totalizadores,
      Lancamentos: lancamentos,
    };

    return res.json(retorno);
  }
}

export default new LancamentoController();
