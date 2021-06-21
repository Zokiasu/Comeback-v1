'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('artists', 'socials', {
        type: Sequelize.ARRAY(Sequelize.STRING(2000)),
      }),
      queryInterface.addColumn('artists', 'platforms', {
        type: Sequelize.ARRAY(Sequelize.STRING(2000)),
      }),
      queryInterface.addColumn('happenings', 'url', {
        type: Sequelize.STRING(2000),
      }),
      queryInterface.addColumn('notifications', 'url', {
        type: Sequelize.STRING(2000),
      }),
      queryInterface.addColumn('releases', 'platforms', {
        type: Sequelize.ARRAY(Sequelize.STRING(2000)),
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
