import Lancamento from '../models/Lancamento';

class LancamentoController {
  async store(req, res) {
    const lancamento = await Lancamento.create(req.body);

    return res.json(lancamento);
  }
}

export default new LancamentoController();
