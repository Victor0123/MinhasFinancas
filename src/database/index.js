import Sequelize from 'sequelize';

import User from '../app/models/User';
import Lancamento from '../app/models/Lancamento';

import databaseConfig from '../config/database';

const models = [Lancamento, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    console.log('dbURL:', databaseConfig);
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
