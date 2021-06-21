'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('happenings', 'date', 'startDate'),
      queryInterface.addColumn('happenings', 'endDate', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
      queryInterface.createTable('Happening_Release', {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        happeningId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        releaseId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
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
