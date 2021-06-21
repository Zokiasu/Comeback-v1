'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('notifications', 'unread'),
      queryInterface.addColumn('notifications', 'title', {
        type: Sequelize.STRING(1000),
        unique: false,
        allowNull: true,
      }),
      queryInterface.removeColumn(
        'notifications', // name of Source model
        'userId', // key we want to remove
      ),
      queryInterface.createTable('user_notification', {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        unread: {
          type: Sequelize.BOOLEAN,
          unique: false,
          allowNull: true,
          defaultValue: true,
        },
        date: {
          type: Sequelize.DATE,
          unique: false,
          allowNull: true,
        },
        userId: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        notificationId: {
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
