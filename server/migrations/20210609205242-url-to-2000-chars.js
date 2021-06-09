'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('artists', 'socials', {
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('artists', 'platforms', {
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('happenings', 'url', {
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('notifications', 'url', {
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('releases', 'platforms', {
        type: Sequelize.STRING(2000),
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
