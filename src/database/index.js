import Sequelize from 'sequelize';

import Lancamento from '../app/models/Lancamento';

import databaseConfig from '../config/database';

const models = [Lancamento];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
