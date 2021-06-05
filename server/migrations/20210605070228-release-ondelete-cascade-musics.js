'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // music belongsTo release
    return queryInterface
      .changeColumn(
        'music', // name of Source model
        'releaseId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'releases', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      )
      .then(() => {
        // Release hasMany Music
        return queryInterface.changeColumn(
          'music', // name of Target model
          'releaseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'music', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        );
      });
  },

  down: async (queryInterface, Sequelize) => {},
};
