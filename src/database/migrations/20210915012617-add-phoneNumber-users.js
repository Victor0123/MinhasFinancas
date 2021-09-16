'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone_number', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'phone_number');
  }
};
