'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('infos', 'date', {
        type: Sequelize.DATE,
        unique: false,
        allowNull: true,
      }),
      queryInterface.addColumn('infos', 'source', {
        type: Sequelize.TEXT,
        unique: false,
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
