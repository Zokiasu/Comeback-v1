'use strict';
import { NOTIFICATION_TYPE } from '../constants';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM(
          NOTIFICATION_TYPE.ARTIST,
          NOTIFICATION_TYPE.COMMENT,
          NOTIFICATION_TYPE.GENERAL,
          NOTIFICATION_TYPE.RELEASE,
        ),
        unique: false,
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING(1000),
        unique: false,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING(1000),
        unique: false,
        allowNull: true,
      },
      unread: {
        type: Sequelize.BOOLEAN,
        unique: false,
        allowNull: true,
        defaultValue: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  },
};
