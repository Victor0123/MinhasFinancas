import Sequelize from 'sequelize';

import User from '../app/models/User.js';
import Lancamento from '../app/models/Lancamento.js';

import databaseConfig from '../config/database.js';

const models = [Lancamento, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
