import Sequelize, { Model } from 'sequelize';

class Lancamento extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.DATE,
        valor: Sequelize.DECIMAL,
        descricao: Sequelize.STRING,
        conta: Sequelize.STRING,
        tipo: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Lancamento;
