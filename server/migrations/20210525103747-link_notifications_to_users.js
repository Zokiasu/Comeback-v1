'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'notifications', // name of Source model
        'userId', // name of the key we're adding
        {
          type: Sequelize.STRING,
          references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      )
      .then(() => {
        return queryInterface.addColumn(
          'notifications', // name of Target model
          'userId', // name of the key we're adding
          {
            type: Sequelize.STRING,
            references: {
              model: 'Orders', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        );
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'notifications', // name of Source model
        'users', // key we want to remove
      )
      .then(() => {
        return queryInterface.removeColumn(
          'notifications', // name of the Target model
          'userId', // key we want to remove
        );
      });
  },
};
