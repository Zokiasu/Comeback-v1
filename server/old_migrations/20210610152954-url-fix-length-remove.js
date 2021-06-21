'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('artists', 'socials'),
      queryInterface.removeColumn('artists', 'platforms'),
      queryInterface.removeColumn('happenings', 'url'),
      queryInterface.removeColumn('notifications', 'url'),
      queryInterface.removeColumn('releases', 'platforms'),
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
