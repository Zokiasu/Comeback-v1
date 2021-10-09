'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Artist'),
      queryInterface.createTable('Artist_Style', {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        artistId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        releaseId: {
          type: Sequelize.UUID,
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
