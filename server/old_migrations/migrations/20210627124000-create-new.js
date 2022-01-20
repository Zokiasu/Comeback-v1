'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('infos', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        message: {
          type: Sequelize.TEXT,
          unique: false,
          allowNull: false,
        },
        verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          unique: false,
          allowNull: true,
        },
      }),
      queryInterface.addColumn(
        'infos', // name of Source model
        'userId', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'infos', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      ),
      queryInterface.addColumn(
        'infos', // name of Source model
        'artistId', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'infos', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      ),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('infos');
  },
};
