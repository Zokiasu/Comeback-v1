'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'username', {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'country', {
        type: Sequelize.STRING(1000),
        allowNull: true,
      }),
      queryInterface.addColumn('users', 'birthday', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
