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
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Lancamento;
