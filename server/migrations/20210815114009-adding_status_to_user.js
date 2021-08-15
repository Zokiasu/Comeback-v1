'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query('DROP TYPE enum_users_subscription'),
      queryInterface.addColumn('users', 'subscription', {
        type: Sequelize.ENUM(
          'REGULAR',
          'SUBSCRIBER',
          'VIP',
        ),
        defaultValue: 'REGULAR',
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
  }
};
