'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('artists', 'verified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        unique: false,
        allowNull: true,
      }),
      queryInterface.removeColumn('artists', 'website'),
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
